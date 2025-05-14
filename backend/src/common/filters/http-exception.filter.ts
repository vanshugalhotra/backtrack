import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpError } from '../errors/http-error';
import { Response, Request } from 'express';
import { LoggerService } from '../logger/logger.service';

const isDev = process.env.NODE_ENV !== 'production';
@Catch(HttpError)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}
  catch(exception: HttpError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Default to Internal Server Error if no statusCode is provided
    const status = exception.statusCode || 500;
    const message = exception.message || 'Something went wrong';
    const details = exception.details || null;

    console.error(`Error: ${message}, Status: ${status}, Details:`, details);
    this.logger.error(
      `[HttpException] ${request.method} ${request.url} - ${status} - ${message}` +
        (details ? ` | Details: ${JSON.stringify(details)}` : ''),
    );

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      ...(isDev && details ? { details } : {}),
    });
  }
}
