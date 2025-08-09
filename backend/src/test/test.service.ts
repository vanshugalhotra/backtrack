import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTestDto } from './dto/create-test.dto';
import { LoggerService } from 'src/common/logger/logger.service';
import { Prisma } from '@prisma/client';
import { PermissionDeniedError } from 'src/common/errors/http-error';

type Test = Prisma.TestGetPayload<{
  include: {
    problems: true;
  };
}>;

@Injectable()
export class TestService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggerService,
  ) {}

  async createTest(dto: CreateTestDto): Promise<Test> {
    this.logger.log(`Creating test: ${dto.name}`);

    // Check if test slug already exists
    const existing = await this.prisma.test.findUnique({
      where: { slug: dto.slug },
    });

    if (existing) {
      this.logger.warn(`Test with slug "${dto.slug}" already exists`);
      throw new BadRequestException(
        `Test with slug "${dto.slug}" already exists`,
      );
    }

    let connectProblems: { id: number }[] = [];

    if (dto.problems && dto.problems.length > 0) {
      const foundProblems = await this.prisma.problem.findMany({
        where: {
          slug: {
            in: dto.problems,
          },
        },
      });

      if (foundProblems.length !== dto.problems.length) {
        const foundSlugs = foundProblems.map((p) => p.slug);
        const missing = dto.problems.filter((s) => !foundSlugs.includes(s));
        this.logger.error(`Problems not found: ${missing.join(', ')}`);
        throw new BadRequestException(
          `Problems not found: ${missing.join(', ')}`,
        );
      }

      connectProblems = foundProblems.map((p) => ({ id: p.id }));
    }

    const newTest = await this.prisma.test.create({
      data: {
        name: dto.name,
        slug: dto.slug,
        description: dto.description,
        password: dto.password,
        hasStarted: dto.hasStarted ?? false,
        problems: {
          connect: connectProblems,
        },
      },
      include: {
        problems: true,
      },
    });

    this.logger.log(
      `Test "${newTest.slug}" created with ${newTest.problems.length} problems`,
    );
    return newTest;
  }

  async getAllTests() {
    this.logger.log('Fetching all tests');
    const tests = await this.prisma.test.findMany({});
    this.logger.log(`Found ${tests.length} tests`);
    return tests;
  }

  async getTestBySlug(slug: string, password?: string): Promise<Test> {
    const test = await this.prisma.test.findUnique({
      where: { slug },
      include: { problems: true },
    });

    if (!test) {
      throw new NotFoundException(`Test with slug "${slug}" not found`);
    }

    if (test.password && test.password !== password) {
      throw new PermissionDeniedError('Incorrect password');
    }

    return test;
  }

  async startTest(slug: string, password: string): Promise<void> {
    const test = await this.prisma.test.findUnique({
      where: { slug },
    });

    if (!test) {
      throw new BadRequestException(`Test not found: ${slug}`);
    }

    if (test.password !== password) {
      throw new PermissionDeniedError('Invalid password');
    }

    if (test.hasStarted) {
      throw new BadRequestException('Test has already started');
    }

    await this.prisma.test.update({
      where: { slug },
      data: { hasStarted: true },
    });
  }
  async stopTest(slug: string, password: string): Promise<void> {
    const test = await this.prisma.test.findUnique({
      where: { slug },
    });

    if (!test) {
      throw new BadRequestException(`Test not found: ${slug}`);
    }

    if (test.password !== password) {
      throw new PermissionDeniedError('Invalid password');
    }

    if (!test.hasStarted) {
      throw new BadRequestException('Test has already ended');
    }

    await this.prisma.test.update({
      where: { slug },
      data: { hasStarted: false },
    });
  }

  async deleteTest(slug: string) {
    const test = await this.prisma.test.findUnique({ where: { slug } });

    if (!test) {
      throw new NotFoundException(`Test with slug "${slug}" not found.`);
    }

    await this.prisma.test.delete({ where: { slug } });

    return { message: `Test "${slug}" deleted successfully.` };
  }

  async isStartedBySlug(slug: string): Promise<boolean> {
    const test = await this.prisma.test.findUnique({
      where: { slug },
      select: { hasStarted: true },
    });

    if (!test) {
      throw new NotFoundException('Test not found');
    }

    return test.hasStarted;
  }
}
