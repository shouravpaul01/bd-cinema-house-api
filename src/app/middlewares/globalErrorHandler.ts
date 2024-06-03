import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';
import { handleZodErrors } from '../../errors/handleZodErrors';
import { handleValidationError } from '../../errors/handleValidationError';
import handleCastError from '../../errors/handleCastError';
import { AppError } from '../errors/AppError';

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Something went to wrong.';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went to wrong.',
    },
  ];
  //Simplified Zod Error || mongoose validation error
  if (error instanceof ZodError) {
    const simplifiedError = handleZodErrors(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (error?.name == 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (error?.name == 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (error instanceof AppError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorSources = [
      {
        path: error?.path || '',
        message: error.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error?.message;
    errorSources = [
      {
        path: '',
        message: error.message,
      },
    ];
  }
  res.status(statusCode).json({
    status: false,
    message,
    errorSources,
    stack: null,
  });
};
