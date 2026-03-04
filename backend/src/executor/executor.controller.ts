import { Controller, Post, Body, Version, UseGuards } from '@nestjs/common';
import { ExecutorService } from './executor.service';
import { ExecuteDto } from './dto/execute.dto';
import { JwtAuthGuard } from 'src/auth/gaurd/jwt-auth.gaurd';

@Controller('execute') // Maps to /api/v1/execute
@UseGuards(JwtAuthGuard)
export class ExecutorController {
  constructor(private readonly executorService: ExecutorService) {}

  @Post()
  @Version('1')
  async execute(@Body() body: ExecuteDto) {
    return this.executorService.runExecutable(body.exePath, body.input);
  }
}
