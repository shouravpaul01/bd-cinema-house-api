import { z } from 'zod';

const createBookingValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'The feild is required.' }),
    phoneNumber: z.string({ required_error: 'The feild is required.' }),
  }),
});

export const BookingValidation = { createBookingValidationSchema };
