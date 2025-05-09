import { Module } from '@nestjs/common'; // Import Module decorator
import { ProblemModule } from './problem/problem.module'; // Import the problem module
import { LoggerModule } from './common/logger/logger.module';
import { ExecutorModule } from './executor/executor.module';

@Module({
  imports: [ProblemModule, LoggerModule, ExecutorModule], // Register ProblemModule
  controllers: [],
  providers: [],
})
export class AppModule {}
