import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { promises as fs } from 'fs';
import { exec } from 'child_process';
import { LoggerService } from 'src/common/logger/logger.service';
import { platform } from 'os';

import {
  BadRequestError,
  InternalServerError,
} from 'src/common/errors/http-error';

const isWindows = platform() === 'win32';
@Injectable()
export class FileUploadService {
  private iconDir = join(process.cwd(), 'uploads', 'icons');
  private exeDir = join(process.cwd(), 'uploads', 'executables');

  constructor(private readonly logger: LoggerService) {}

  async saveIcon(file: Express.Multer.File): Promise<{ fileName: string }> {
    if (!file) {
      this.logger.error('No icon file provided');
      throw new BadRequestError('No icon file provided.');
    }
    return this.saveFile(file, this.iconDir);
  }

  async saveExecutable(
    file: Express.Multer.File,
  ): Promise<{ fileName: string }> {
    if (!file) {
      this.logger.error('No executable file provided');
      throw new BadRequestError('No executable file provided.');
    }
    return this.saveFile(file, this.exeDir);
  }

  async saveCppAndCompile(
    file: Express.Multer.File,
  ): Promise<{ fileName: string }> {
    if (!file) {
      this.logger.error('No C++ file provided');
      throw new BadRequestError('No C++ file provided.');
    }

    const saved = await this.saveFile(file, this.exeDir);
    const cppPath = join(this.exeDir, saved.fileName);

    const outputName = saved.fileName.replace(
      /\.cpp$/,
      isWindows ? '.exe' : '.out',
    );
    const outputPath = join(this.exeDir, outputName);

    this.logger.log(`Compiling ${cppPath} -> ${outputPath}`);

    try {
      await new Promise<void>((resolve, reject) => {
        exec(`g++ "${cppPath}" -o "${outputPath}"`, (error, stdout, stderr) => {
          if (error) {
            this.logger.error(`Compilation failed: ${stderr || error.message}`);
            return reject(
              new BadRequestError('Compilation failed. Check your C++ code.'),
            );
          }

          if (stderr) {
            this.logger.warn(`Compilation warnings: ${stderr}`);
          }

          if (stdout) {
            this.logger.log(`Compiler messages: ${stdout}`);
          }

          resolve();
        });
      });

      this.logger.log(`Compilation successful: ${outputName}`);
      return { fileName: outputName };
    } catch (err) {
      if (err instanceof Error) {
        this.logger.error(`Failed to compile C++ file: ${err.message}`);
        throw new InternalServerError('Failed to compile C++ file.', {
          error: err.message,
        });
      } else {
        this.logger.error('Unknown error while compiling C++ file');
        throw new InternalServerError('Failed to compile C++ file.');
      }
    }
  }

  private async saveFile(
    file: Express.Multer.File,
    directory: string,
  ): Promise<{ fileName: string }> {
    try {
      if (!file || !file.originalname) {
        throw new Error('File does not have a valid originalname.');
      }

      const filePath = join(directory, file.originalname);
      this.logger.log(`Saving file to ${filePath}`);

      await fs.mkdir(directory, { recursive: true });
      await fs.writeFile(filePath, file.buffer);

      this.logger.log(`File saved: ${file.originalname}`);
      return { fileName: file.originalname };
    } catch (err) {
      if (err instanceof Error) {
        this.logger.error(`Failed to save file: ${err.message}`);
        throw new InternalServerError('Failed to save file.', {
          error: err.message,
        });
      } else {
        this.logger.error('An unknown error occurred while saving the file');
        throw new InternalServerError('Failed to save file.');
      }
    }
  }
}
