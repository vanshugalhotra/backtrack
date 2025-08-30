import { Injectable, OnModuleInit } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { readFileSync } from 'fs';
import * as os from 'os';
import { collectDefaultMetrics, register } from 'prom-client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HealthService implements OnModuleInit {
  private uploadDirs = [
    join(process.cwd(), 'uploads', 'icons'),
    join(process.cwd(), 'uploads', 'executables'),
  ];

  constructor(private readonly prisma: PrismaService) {}

  onModuleInit() {
    collectDefaultMetrics({ register, prefix: 'backtrack_' });
  }

  getLiveness() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }

  async getReadiness() {
    try {
      for (const dir of this.uploadDirs) {
        await fs.mkdir(dir, { recursive: true });
        await fs.access(dir, fs.constants.W_OK);
      }

      // DATABASE CHECK
      await this.prisma.$queryRaw`SELECT 1;`;

      return {
        status: 'ok',
        details: {
          uploads: 'writable',
          database: 'connected',
          memory: process.memoryUsage(),
          uptime: process.uptime(),
        },
      };
    } catch (err) {
      return {
        status: 'error',
        error: err instanceof Error ? err.message : 'Unknown error',
      };
    }
  }

  getVersion() {
    try {
      const pkgRaw = readFileSync(join(process.cwd(), 'package.json'), 'utf-8');
      const pkg = JSON.parse(pkgRaw) as { version: string; name: string };

      return {
        version: pkg.version,
        name: pkg.name,
        environment: process.env.NODE_ENV || 'development',
      };
    } catch (err) {
      return {
        version: 'unknown',
        name: 'unknown',
        error: err instanceof Error ? err.message : 'Unknown error',
      };
    }
  }

  async getPrometheusMetrics(): Promise<string> {
    return register.metrics();
  }

  getPromContentType(): string {
    return register.contentType;
  }

  getMetricsJson() {
    return {
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      loadAverage: os.loadavg(),
      cpuCount: os.cpus().length,
      platform: os.platform(),
      timestamp: new Date().toISOString(),
    };
  }
}
