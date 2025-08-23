import { Controller, Get, Version } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('liveness')
  @Version('1')
  checkLiveness() {
    return this.healthService.getLiveness();
  }

  @Get('readiness')
  @Version('1')
  async checkReadiness() {
    return this.healthService.getReadiness();
  }

  @Get('version')
  @Version('1')
  getVersion() {
    return this.healthService.getVersion();
  }

  @Get('metrics')
  @Version('1')
  getMetrics() {
    return this.healthService.getMetrics();
  }
}
