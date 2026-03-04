import { Module } from '@nestjs/common';
import { ExecutorController } from './executor.controller';
import { ExecutorService } from './executor.service';
import { LoggerService } from 'src/common/logger/logger.service';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret', // same secret used in JwtStrategy
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [ExecutorController],
  providers: [ExecutorService, LoggerService],
})
export class ExecutorModule {}
