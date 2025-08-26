import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { promises as fs } from 'fs';
import { LoggerService } from 'src/common/logger/logger.service';
import {
  BadRequestError,
  InternalServerError,
} from 'src/common/errors/http-error';

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
      // Safely handle the error
      if (err instanceof Error) {
        // Only access `err.message` if it's an instance of `Error`
        this.logger.error(`Failed to save file: ${err.message}`);
        throw new InternalServerError('Failed to save file.', {
          error: err.message,
        });
      } else {
        // If `err` is not an `Error` instance, log a generic error message
        this.logger.error('An unknown error occurred while saving the file');
        throw new InternalServerError('Failed to save file.');
      }
    }
  }
}
