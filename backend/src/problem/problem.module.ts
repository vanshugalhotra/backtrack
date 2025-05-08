import { Module } from '@nestjs/common'; // Import the NestJS Module decorator
import { ProblemService } from './problem.service'; // Import the service
import { ProblemController } from './problem.controller'; // Import the controller
import { PrismaService } from '../prisma/prisma.service'; // Import PrismaService to be injected

@Module({
  imports: [],
  controllers: [ProblemController], // Register the controller
  providers: [ProblemService, PrismaService], // Register the service and Prisma service as providers
})
export class ProblemModule {}
