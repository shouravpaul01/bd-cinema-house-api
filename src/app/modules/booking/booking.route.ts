import express from 'express';
import { BookingController } from './booking.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BookingValidation } from './booking.validation';
const router = express.Router();
router.post(
  '/create-booking',
  validateRequest(BookingValidation.createBookingValidationSchema),
  BookingController.createBookingIntro
);
router.delete('/', BookingController.deleteBooking);
router.patch('/:bookingId', BookingController.updateBookingIntro);
router.patch(
  '/purchase-confirm/:bookingId',
  validateRequest(BookingValidation.createBookingConfirmValidationSchema),
  BookingController.bookingConfirm
);
router.post('/payment/success/:bookingId', BookingController.paymentSuccess);
router.post('/payment/cencel/:bookingId', BookingController.paymentCencel);
router.get('/match-by', BookingController.bookedSeats);
router.get('/my-booking', BookingController.getBookingByEmail);
router.get('/all-booking', BookingController.getAllBooking);
export const BookingRoutes = router;
