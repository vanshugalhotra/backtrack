export class HttpError extends Error {
    constructor(
      public statusCode: number,
      public message: string,
      public details?: any
    ) {
      super(message);
      this.statusCode = statusCode;
      this.message = message;
      this.details = details;
    }
  }
  
  export class NotFoundError extends HttpError {
    constructor(message: string, details?: any) {
      super(404, message, details);
    }
  }
  
  export class BadRequestError extends HttpError {
    constructor(message: string, details?: any) {
      super(400, message, details);
    }
  }
  
  export class InternalServerError extends HttpError {
    constructor(message: string, details?: any) {
      super(500, message, details);
    }
  }
  