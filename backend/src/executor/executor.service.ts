import {
  Injectable,
  InternalServerErrorException,
  RequestTimeoutException,
  BadRequestException,
} from '@nestjs/common';
import { spawn } from 'child_process';
import { LoggerService } from 'src/common/logger/logger.service';
import * as fs from 'fs';

@Injectable()
export class ExecutorService {
  constructor(private readonly logger: LoggerService) {}

  async runExecutable(
    exePath: string,
    input: string,
  ): Promise<{ output?: string; error?: string; exitCode: number }> {
    // Validate file existence
    if (!fs.existsSync(exePath)) {
      this.logger.error(`Executable not found at: ${exePath}`);
      throw new InternalServerErrorException('Executable path is invalid.');
    }

    // Check if executable has execute permissions
    try {
      fs.accessSync(exePath, fs.constants.X_OK); // Check for execute permission
    } catch {
      this.logger.error(`Executable is not accessible at: ${exePath}`);
      throw new InternalServerErrorException(
        'Executable does not have execute permissions.',
      );
    }

    // Input validation
    if (!input || typeof input !== 'string') {
      this.logger.error('Invalid input provided for execution.');
      throw new BadRequestException('Input should be a valid string.');
    }

    return new Promise((resolve, reject) => {
      const child = spawn(exePath, [], {
        stdio: 'pipe',
      });

      const timeout = setTimeout(() => {
        this.logger.warn(
          `Execution timed out for: ${exePath}. No response after 5 seconds.`,
        );
        child.kill('SIGTERM');
        reject(new RequestTimeoutException('Execution timed out.'));
      }, 5000); // 5 second timeout

      let stdout = '';
      let stderr = '';

      child.stdin.write(input, (err) => {
        if (err) {
          this.logger.error(
            `Error writing input to executable: ${err.message}`,
          );
          reject(
            new InternalServerErrorException(
              'Error writing input to executable.',
            ),
          );
        }
      });

      child.stdin.end();

      child.stdout.on('data', (data: Buffer) => {
        stdout += data.toString();
      });

      child.stderr.on('data', (data: Buffer) => {
        stderr += data.toString();
      });

      child.on('error', (err) => {
        this.logger.error(`Execution error: ${err.message}`);
        clearTimeout(timeout);
        reject(new InternalServerErrorException('Execution failed.'));
      });

      child.on('close', (code) => {
        clearTimeout(timeout);
        const exitCode = code ?? -1;

        if (exitCode !== 0) {
          this.logger.warn(
            `Process exited with code ${exitCode}, stderr: ${stderr}`,
          );
          resolve({
            error: stderr.trim(),
            exitCode,
          });
        } else {
          resolve({
            output: stdout.trim(),
            exitCode,
          });
        }
      });
    });
  }
}
