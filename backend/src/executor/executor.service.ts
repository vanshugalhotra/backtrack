import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import * as fs from 'fs';
import { LoggerService } from 'src/common/logger/logger.service';
import {
  BadRequestError,
  InternalServerError,
  PermissionDeniedError,
  RequestTimeoutError,
} from 'src/common/errors/http-error';

export type ExecutorResponse = {
  output?: string;
  error?: string;
  exitCode: number;
};

@Injectable()
export class ExecutorService {
  constructor(private readonly logger: LoggerService) {}

  async runExecutable(
    exePath: string,
    input: unknown,
  ): Promise<ExecutorResponse> {
    // Check if input is provided at all
    if (input === undefined || input === null) {
      this.logger.error('Input field is missing');
      throw new BadRequestError('`input` field is required.');
    }

    // Check if executable exists
    if (!fs.existsSync(exePath)) {
      this.logger.error(`Executable not found at: ${exePath}`);
      throw new InternalServerError('Executable path is invalid.', { exePath });
    }

    // Check if executable is accessible
    try {
      fs.accessSync(exePath, fs.constants.X_OK);
    } catch {
      this.logger.error(`No execute permissions for: ${exePath}`);
      throw new PermissionDeniedError(
        'Executable does not have execute permissions.',
        { exePath },
      );
    }

    // If input is empty string, return empty output (user mistake)
    if (input === '') {
      this.logger.warn('Input is an empty string — returning empty output');
      return { output: '', exitCode: 0 };
    }

    // Convert other input types to string to pass to executable
    if (typeof input !== 'string') {
      this.logger.error('Invalid input: must be a string');
      input = JSON.stringify(input);
    }
    const inputStr = typeof input === 'string' ? input : String(input);

    return new Promise((resolve, reject) => {
      const child = spawn(exePath, [], { stdio: 'pipe' });

      const timeout = setTimeout(() => {
        this.logger.warn(`Execution timed out for: ${exePath}`);
        child.kill('SIGTERM');
        reject(new RequestTimeoutError('Execution timed out.', { exePath }));
      }, 5000);

      let stdout = '';

      child.stdin.write(inputStr, (err) => {
        if (err) {
          this.logger.error(`Failed to write to stdin: ${err.message}`);
          reject(
            new InternalServerError('Failed to write to executable.', {
              input: inputStr,
              error: err.message,
            }),
          );
        }
      });

      child.stdin.end();

      child.stdout.on('data', (data: Buffer) => {
        stdout += data.toString();
      });

      child.on('error', (err) => {
        this.logger.error(`Execution failed: ${err.message}`);
        clearTimeout(timeout);
        reject(
          new InternalServerError('Execution failed.', { error: err.message }),
        );
      });

      child.on('close', (code) => {
        clearTimeout(timeout);
        const exitCode = code ?? -1;

        if (exitCode !== 0) {
          this.logger.warn(`Non-zero exit code: ${exitCode}`);
          resolve({ output: 'ERROR', exitCode });
        } else {
          resolve({ output: stdout.trim(), exitCode });
        }
      });
    });
  }
}
