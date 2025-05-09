import { Module } from '@nestjs/common';
import { ExecutorController } from './executor.controller';
import { ExecutorService } from './executor.service';
import { LoggerService } from 'src/common/logger/logger.service';

@Module({
  controllers: [ExecutorController],
  providers: [ExecutorService, LoggerService],
})
export class ExecutorModule {}
