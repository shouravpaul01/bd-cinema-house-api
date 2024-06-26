import { z } from 'zod';

const createMovieValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'The feild is required.' }),
    image: z.object({}),
    category: z.string({ required_error: 'The feild is required.' }),
    director: z.string({ required_error: 'The feild is required.' }),
    duration: z
      .number({ required_error: 'The feild is required.' })
      .int({ message: 'Invaild Duration.' }),
    rating: z
      .number({ required_error: 'The feild is required.' })
      .min(0, { message: 'Invalid Rating.' })
      .max(10, { message: 'Invalid Rating.' }),
    actors: z.array(z.string()),
    genres: z.array(z.string()),
    languages: z.array(z.string()),
    description: z.string().optional(),
    releaseDate: z.string({ required_error: 'The feild is required.' }),
  }),
});
const updateMovieValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    image: z.object({}).optional(),
    category: z.string().optional(),
    director: z.string().optional(),
    duration: z.number().int({ message: 'Invaild Duration.' }).optional(),
    rating: z
      .number({ invalid_type_error: 'Invalid Rating.' })
      .min(0, { message: 'Invalid Rating.' })
      .max(10, { message: 'Invalid Rating.' })
      .optional(),
    actors: z.array(z.string()).optional(),
    genres: z.array(z.string()).optional(),
    languages: z.array(z.string()).optional(),
    description: z.string().optional(),
    releaseDate: z.string().optional(),
    status: z
      .enum(['active', 'inactive'], { message: 'Invaild Status.' })
      .optional(),
  }),
});
export const MovieValidation = {
  createMovieValidationSchema,
  updateMovieValidationSchema,
};
