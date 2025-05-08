import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Prisma service for interacting with the DB
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { LoggerService } from 'src/common/logger/logger.service';

import { Prisma } from '@prisma/client';

type Problem = Prisma.ProblemGetPayload<object>;

@Injectable() // This decorator marks the class as a provider (a service) that can be injected into other classes
export class ProblemService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggerService, // Injecting a logger service for logging purposes
  ) {} // Inject PrismaService into the constructor

  // Method to fetch all problems
  async getAllProblems(): Promise<Problem[]> {
    this.logger.log('Fetching all problems');
    const problems = await this.prisma.problem.findMany(); // Using Prisma to fetch all problems from DB
    this.logger.log(`Found ${problems.length} problems`); // Logging the number of problems found
    return problems; // Using Prisma to fetch all problems from DB
  }

  async create(data: CreateProblemDto) {
    return this.prisma.problem.create({ data });
  }

  async findBySlug(slug: string) {
    const problem = await this.prisma.problem.findUnique({
      where: { slug }, // Find a unique problem by its slug
    });
    if (!problem) {
      throw new NotFoundException(`Problem with slug "${slug}" not found`); // Throw an error if the problem is not found
    }

    return problem;
  }

  async deleteProblemBySlug(slug: string) {
    const problem = await this.prisma.problem.findUnique({
      where: { slug },
    });

    if (!problem) {
      this.logger.error(`Problem with slug "${slug}" not found`); // Log an error if the problem is not found
      throw new NotFoundException(`Problem with slug "${slug}" not found`);
    }

    return this.prisma.problem.delete({
      where: { slug },
    });
  }

  async updateProblemBySlug(slug: string, updateProblemDto: UpdateProblemDto) {
    const existing = await this.prisma.problem.findUnique({ where: { slug } });

    if (!existing) {
      throw new NotFoundException(`Problem with slug "${slug}" not found`);
    }

    return this.prisma.problem.update({
      where: { slug },
      data: updateProblemDto,
    });
  }
}
