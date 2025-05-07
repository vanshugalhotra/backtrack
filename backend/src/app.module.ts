import { Module } from '@nestjs/common';  // Import Module decorator
import { ProblemModule } from './problem/problem.module';  // Import the problem module
import { LoggerModule } from './common/logger/logger.module';

@Module({
  imports: [ProblemModule, LoggerModule],  // Register ProblemModule
  controllers: [],
  providers: []
})
export class AppModule {}
