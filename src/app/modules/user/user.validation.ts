import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'The field is required.' }),
    email: z
      .string({ required_error: 'The field is required.' })
      .email({ message: 'Invalid email format.' }),
    phoneNumber: z.number().optional(),
    password: z
      .string({ required_error: 'The field is required.' })
      .min(8, { message: 'Password must be 8 charecter.' }),
    role: z.enum(['User', 'Admin'], { message: 'Invalid Type.' }).optional(),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'The field is required.' }).optional(),
    email: z
      .string({ required_error: 'The field is required.' })
      .email({ message: 'Invalid email format.' })
      .optional(),
    phoneNumber: z.number().optional(),
    role: z.enum(['User', 'Admin'], { message: 'Invalid Type.' }).optional(),
  }),
});
export const UserVlaidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
