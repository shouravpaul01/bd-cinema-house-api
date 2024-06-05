import { z } from 'zod';

const createBookingValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'The feild is required.' })
      .email({ message: 'Invalid Email.' }),
    movie: z.string({ required_error: 'The feild is required.' }),
    time: z.string({ required_error: 'The feild is required.' }),
    seatType: z.enum(['regular', 'premium'], {
      message: 'Invalid Seat Type.',
      required_error: 'The feild is required.',
    }),
    date: z.string({ required_error: 'The feild is required.' }),
    totalAmount: z.number({
      invalid_type_error: 'Invalid Amount',
      required_error: 'The feild is required.',
    }),
  }),
});
const createBookingConfirmValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'The feild is required.' }),
    phoneNumber: z.string({ required_error: 'The feild is required.' }),
  }),
});

export const BookingValidation = {
  createBookingValidationSchema,
  createBookingConfirmValidationSchema,
};
