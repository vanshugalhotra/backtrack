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
  private readonly allowedDirectories = [
    './uploads/executables',
    './test-bin',
    'uploads/executables',
    'test-bin',
  ];
  constructor(private readonly logger: LoggerService) {}

  private isAllowedPath(exePath: string): boolean {
    const isAllowedDir = this.allowedDirectories.some((dir) =>
      exePath.startsWith(dir),
    );
    if (isAllowedDir) {
      return true;
    }
    this.logger.error(`Unauthorized executable path: ${exePath}`);
    return false;
  }

  async runExecutable(
    exePath: string,
    input: unknown,
  ): Promise<ExecutorResponse> {
    this.logger.log(`Starting execution of: ${exePath}`);

    if (!this.isAllowedPath(exePath)) {
      throw new PermissionDeniedError('Unauthorized executable path.', {
        exePath,
      });
    }
    if (input === undefined || input === null) {
      this.logger.error('Input field is missing');
      throw new BadRequestError('`input` field is required.');
    }

    if (!fs.existsSync(exePath)) {
      this.logger.error(`Executable not found at: ${exePath}`);
      throw new InternalServerError('Executable path is invalid.', { exePath });
    }

    try {
      fs.accessSync(exePath, fs.constants.X_OK);
    } catch {
      this.logger.error(`No execute permissions for: ${exePath}`);
      throw new PermissionDeniedError(
        'Executable does not have execute permissions.',
        { exePath },
      );
    }

    if (input === '') {
      this.logger.warn('Input is an empty string — returning empty output');
      return { output: '', exitCode: 0 };
    }

    if (typeof input !== 'string') {
      this.logger.warn(
        `Input is not a string. Converting to string: ${JSON.stringify(input)}`,
      );
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
        const output = data.toString();
        stdout += output;
      });

      child.on('error', (err) => {
        clearTimeout(timeout);
        this.logger.error(`Execution failed: ${err.message}`);
        reject(
          new InternalServerError('Execution failed.', { error: err.message }),
        );
      });

      child.on('close', (code) => {
        clearTimeout(timeout);
        const exitCode = code ?? -1;

        this.logger.log(
          `Execution finished for ${exePath} with exit code ${exitCode}`,
        );

        if (exitCode !== 0) {
          this.logger.warn(`Non-zero exit code received: ${exitCode}`);
          resolve({ output: 'ERROR', exitCode });
        } else {
          resolve({ output: stdout.trim(), exitCode });
        }
      });
    });
  }
}
