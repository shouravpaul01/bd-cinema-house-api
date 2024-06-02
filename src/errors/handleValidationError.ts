import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../app/interface/error';

export const handleValidationError = (
  error: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const statusCode = 400;
  const errorSources = Object.values(error.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val.message,
      };
    }
  );
  return {
    statusCode,
    message: 'Mongoose Validation error.',
    errorSources,
  };
};
