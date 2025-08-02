import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ValidationError } from 'class-validator';

export const validationPipe = new ValidationPipe({
  transform: true, // Automatically transform payload to DTO instance
  whitelist: true, // Remove properties not defined in DTO
  forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are present
  exceptionFactory: (errors: ValidationError[]) => {
    // Customize error structure for RpcException
    const formattedErrors = errors.map((error) => ({
      field: error.property,
      constraints: Object.values(error.constraints as Record<string, string>),
    }));

    // Throw an RpcException with a custom error object
    return new RpcException({
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY, // Validation Errors
      message: 'Validation failed',
      errors: formattedErrors,
    });
  },
});
