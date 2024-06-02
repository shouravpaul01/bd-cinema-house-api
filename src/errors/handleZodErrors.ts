import { ZodError, ZodIssue } from 'zod';
import { TGenericErrorResponse } from '../app/interface/error';

export const handleZodErrors = (error: ZodError): TGenericErrorResponse => {
  const statusCode = 400;
  const errorSources = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  return {
    statusCode,
    message: 'Zod validation error.',
    errorSources,
  };
};
