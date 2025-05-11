import { Module } from '@nestjs/common'; // Import Module decorator
import { ProblemModule } from './problem/problem.module'; // Import the problem module
import { LoggerModule } from './common/logger/logger.module';
import { ExecutorModule } from './executor/executor.module';
import { FileUploadModule } from './file-upload/file-upload.module';

@Module({
  imports: [ProblemModule, LoggerModule, ExecutorModule, FileUploadModule], // Register ProblemModule
  controllers: [],
  providers: [],
})
export class AppModule {}
