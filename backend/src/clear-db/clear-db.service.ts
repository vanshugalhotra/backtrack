import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClearDbService {
  constructor(private prisma: PrismaService) {}

  async clearUsers() {
    await this.prisma.user.deleteMany({});
  }

  async clearProblems() {
    await this.prisma.problem.deleteMany({});
  }

  async clearAll() {
    await Promise.all([this.clearUsers(), this.clearProblems()]);
  }
}
