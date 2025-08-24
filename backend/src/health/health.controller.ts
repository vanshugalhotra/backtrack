import { Controller, Get, Version, Res } from '@nestjs/common';
import { HealthService } from './health.service';
import { Response } from 'express';

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
  async getMetrics(@Res({ passthrough: true }) res: Response) {
    res.setHeader('Content-Type', this.healthService.getPromContentType());
    return this.healthService.getPrometheusMetrics();
  }

  @Get('metrics-json')
  @Version('1')
  getMetricsJson() {
    return this.healthService.getMetricsJson();
  }
}
