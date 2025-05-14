import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ProblemService } from './problem.service';
import { ProblemController } from './problem.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret', // same secret used in JwtStrategy
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [ProblemController],
  providers: [ProblemService, PrismaService],
})
export class ProblemModule {}
