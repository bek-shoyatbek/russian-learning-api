import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError, Prisma.PrismaClientValidationError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError | Prisma.PrismaClientValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle known Prisma errors
      switch (exception.code) {
        case 'P2002': {
          // Unique constraint violation
          return response.status(HttpStatus.CONFLICT).json({
            statusCode: HttpStatus.CONFLICT,
            message: 'Unique constraint violation',
            detail: `The value for the field '${(exception.meta as any)?.target?.[0]}' is already taken`,
          });
        }
        case 'P2003': {
          // Foreign key constraint violation
          return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Foreign key constraint violation',
            detail: 'The referenced record does not exist',
          });
        }
        case 'P2025': {
          // Record not found
          return response.status(HttpStatus.NOT_FOUND).json({
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Record not found',
            detail: exception.meta?.cause || 'The requested record does not exist',
          });
        }
        default:
          // Handle other Prisma errors
          return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Database error',
            detail: exception.message,
            code: exception.code,
          });
      }
    } else {
      // Handle Prisma validation errors
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Validation error',
        detail: exception.message,
      });
    }
  }
}