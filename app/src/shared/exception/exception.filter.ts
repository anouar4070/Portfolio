import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  ValidationError,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class GenericExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctxt = host.switchToHttp();
    const response = ctxt.getResponse<Response>();
    const request = ctxt.getRequest<Request>();
    const status = exception.getStatus();

    console.log(JSON.stringify(exception, null, 2));

    const validationErrors: Record<string, string> = {};

    if (Array.isArray(exception.cause)) {
      const errors = exception.cause as ValidationError[];
      errors.forEach((error) => {
        if (error.constraints) {
          //verifying if constraints exists before using it
          const firstConstraint = Object.values(error.constraints)[0];
          validationErrors[error.property] = firstConstraint;
        }
      });
    }

    response.status(status).json({
      status,
      timestamp: Date.now(),
      path: request.url,
      message: exception.message,
      validationErrors: Object.keys(validationErrors).length
        ? validationErrors
        : undefined,
    });
  }
}
