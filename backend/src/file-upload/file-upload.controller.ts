import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { BadRequestError } from 'src/common/errors/http-error';
@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('icon')
  @Version('1')
  @UseInterceptors(FileInterceptor('file'))
  async uploadIcon(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestError('No icon file uploaded.');
    }

    return this.fileUploadService.saveIcon(file);
  }

  @Post('exe')
  @Version('1')
  @UseInterceptors(FileInterceptor('file'))
  async uploadExecutable(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestError('No executable file uploaded.');
    }

    return this.fileUploadService.saveExecutable(file);
  }

  @Post('cpp')
  @Version('1')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCpp(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestError('No C++ file uploaded.');
    }

    return this.fileUploadService.saveCppAndCompile(file);
  }
}
