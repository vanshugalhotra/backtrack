import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  Registry,
  collectDefaultMetrics,
  Histogram,
  Counter,
  Gauge,
} from 'prom-client';

@Injectable()
export class MetricsService implements OnModuleInit {
  private readonly registry = new Registry();

  // We’ll wire these in Step 2
  public httpRequestDuration!: Histogram<string>;
  public httpRequestsTotal!: Counter<string>;
  public httpRequestsInFlight!: Gauge<string>;

  onModuleInit() {
    // Collect lightweight Node/OS metrics on a timer (default ~10s)
    collectDefaultMetrics({
      register: this.registry,
      prefix: 'backtrack_',
    });

    // Create empty shells so DI consumers won’t crash before Step 2
    this.httpRequestDuration = new Histogram({
      name: 'backtrack_http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['method', 'route', 'status_code'],
      buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
      registers: [this.registry],
    });

    this.httpRequestsTotal = new Counter({
      name: 'backtrack_http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status_code'],
      registers: [this.registry],
    });

    this.httpRequestsInFlight = new Gauge({
      name: 'backtrack_http_requests_in_flight',
      help: 'In-flight HTTP requests',
      labelNames: ['method', 'route'],
      registers: [this.registry],
    });
  }

  getRegistry(): Registry {
    return this.registry;
  }

  async getMetricsText(): Promise<string> {
    return this.registry.metrics();
  }

  getContentType(): string {
    // Registry exposes the correct Prometheus content type
    return (
      this.registry.contentType || 'text/plain; version=0.0.4; charset=utf-8'
    );
  }
}
