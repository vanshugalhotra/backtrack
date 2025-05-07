import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpError } from '../errors/http-error';
import { Response, Request } from 'express';

@Catch(HttpError)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Default to Internal Server Error if no statusCode is provided
    const status = exception.statusCode || 500;
    const message = exception.message || 'Something went wrong';
    const details = exception.details || null;

    // Log the error details for debugging (you can enhance this with a logging library)
    console.error(`Error: ${message}, Status: ${status}, Details:`, details);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
      details: details,
    });
  }
}
