import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';

const createBookingIntro = catchAsync(async (req, res) => {
  console.log(req.body, 'crete');
  const result = await BookingServices.createBookingIntroDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Successfully Booked.',
    data: result,
  });
});
const deleteBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.deleteBookingDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Successfully Deleted.',
    data: result,
  });
});
const updateBookingIntro = catchAsync(async (req, res) => {
  const { bookingId } = req.params;
  const result = await BookingServices.updateBookingIntroDB(
    bookingId,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Successfully Updated.',
    data: result,
  });
});
const bookingConfirm = catchAsync(async (req, res) => {
  const { bookingId } = req.params;
  console.log(bookingId, 'booking confirm');
  const result = await BookingServices.bookingConfirmDB(
    bookingId,
    req.body,
    res
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Successfully Confrim.',
    data: result,
  });
});
const paymentSuccess = catchAsync(async (req, res) => {
  const { bookingId } = req.params;
  const result = await BookingServices.paymentSuccessDB(bookingId);
  console.log(result, 'success');
  if (result.modifiedCount > 0) {
    res.redirect(`http://localhost:5173/ticket-booking/success/${bookingId}`);
  }
});
const paymentCencel = catchAsync(async (req, res) => {
  const { bookingId } = req.params;
  const result = await BookingServices.paymentCencelDB(bookingId);
  if (result.deletedCount > 0) {
    res.redirect(`http://localhost:5173/ticket-booking/cencel/${bookingId}`);
  }
});
const bookedSeats = catchAsync(async (req, res) => {
  console.log(req.query);
  const { movie, date, time, seatType } = req.query;
  const result = await BookingServices.bookedSeatsDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Successfully Updated.',
    data: result,
  });
});
const getBookingByEmail = catchAsync(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 5;
  const { bookingId, email } = req.query;
  const result = await BookingServices.getBookingByEmailDB(
    page,
    pageSize,
    bookingId as string,
    email as string
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Successfully Fetched.',
    data: result,
  });
});
const getAllBooking = catchAsync(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 5;
  const { search } = req.query;
  const result = await BookingServices.getAllBookingDB(
    page,
    pageSize,
    search as string
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Successfully Fetched.',
    data: result,
  });
});
export const BookingController = {
  createBookingIntro,
  deleteBooking,
  updateBookingIntro,
  bookingConfirm,
  paymentSuccess,
  paymentCencel,
  bookedSeats,
  getBookingByEmail,
  getAllBooking,
};
