import { NextFunction, Request, Response } from 'express';

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Something went to wrong.';
  res.status(statusCode).json({
    status: false,
    message,
    error: error,
  });
};
