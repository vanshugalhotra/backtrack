import { Module } from '@nestjs/common';
import { ProblemModule } from './problem/problem.module';
import { LoggerModule } from './common/logger/logger.module';
import { ExecutorModule } from './executor/executor.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { AuthModule } from './auth/auth.module';
import { ClearDbModule } from './clear-db/clear-db.module';
import { TestModule } from './test/test.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ProblemModule,
    LoggerModule,
    ExecutorModule,
    FileUploadModule,
    AuthModule,
    ClearDbModule,
    TestModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
