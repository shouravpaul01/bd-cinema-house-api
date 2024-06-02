import { date, z } from 'zod';
import { Movie } from '../movie/movie.model';

const seatTypePriceValidationSchema = z.object({
  seatType: z.enum(['regular', 'premium'], {
    message: 'Invaild Seat Type.',
  }),
  price: z
    .number({
      invalid_type_error: 'Price must be a number.',
      required_error: 'The feild is required.',
    })
    .nonnegative('Price must be a positive number.'),
});
const showTimeTypePriceValidationSchema = z.object({
  time: z.string({
    invalid_type_error: 'Invaild Time.',
    required_error: 'The feild is required.',
  }),
  seatTypesPrice: z
    .array(seatTypePriceValidationSchema)
    .nonempty('At least one seat type price is required'),
  status: z.enum(['active', 'inactive']).default('inactive'),
});
const createShowtimeValidationSchema = z.object({
  body: z.object({
    date: z.string({ required_error: 'The feild is required.' }),
    movie: z.string({ required_error: 'The feild is required.' }),
    showTimesTypesPrice: z.array(showTimeTypePriceValidationSchema),
  }),
});
const updateShowtimeValidationSchema = z.object({
  body: z.object({
    date: z.string({ required_error: 'The feild is required.' }).optional(),
    movie: z.string({ required_error: 'The feild is required.' }).optional(),
    showTimesTypesPrice: z.array(showTimeTypePriceValidationSchema).optional(),
  }),
});

export const ShowtimeValidation = {
  createShowtimeValidationSchema,
  updateShowtimeValidationSchema,
};
