import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';
import { handleZodErrors } from '../../errors/handleZodErrors';
import { handleValidationError } from '../../errors/handleValidationError';
import handleCastError from '../../errors/handleCastError';

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Something went to wrong.';
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
  } else if (error?.code == 11000) {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }
  res.status(statusCode).json({
    status: false,
    message,
    errorSources,
    stack: null,
  });
};
