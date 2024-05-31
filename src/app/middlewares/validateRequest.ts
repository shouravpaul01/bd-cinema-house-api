import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: Object.keys(req.body).length ? req.body : req.query,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validateRequest;
