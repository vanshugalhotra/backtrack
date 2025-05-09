export class HttpError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public details?: unknown,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.details = details;
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string, details?: unknown) {
    super(404, message, details);
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string, details?: unknown) {
    super(400, message, details);
  }
}

export class InternalServerError extends HttpError {
  constructor(message: string, details?: unknown) {
    super(500, message, details);
  }
}

export class RequestTimeoutError extends HttpError {
  constructor(message = 'Request timed out.', details?: unknown) {
    super(408, message, details);
  }
}

export class PermissionDeniedError extends HttpError {
  constructor(message = 'Permission denied.', details?: unknown) {
    super(403, message, details);
  }
}
