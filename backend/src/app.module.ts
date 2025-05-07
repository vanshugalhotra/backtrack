import { Module } from '@nestjs/common';  // Import Module decorator
import { ProblemModule } from './problem/problem.module';  // Import the problem module

@Module({
  imports: [ProblemModule],  // Register ProblemModule
  controllers: [],
  providers: [],
})
export class AppModule {}
