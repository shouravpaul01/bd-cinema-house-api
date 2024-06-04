import { Response } from 'express';
import { config } from '../../config';
import { generateTansectionNumber } from '../../utils/generateTansectionNumber';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';

import SSLCommerzPayment from 'sslcommerz-lts';
const store_id = config.SSLCOMMERZ_STOREID;
const store_passwd = config.SSLCOMMERZ_PASSWORD;
const is_live = false;

const createBookingIntroDB = async (payload: TBooking) => {
  const result = await Booking.create(payload);
  return result;
};
const deleteBookingDB = async (query: Record<string, unknown>) => {
  if (query.bookingId && query.seat) {
    const result = await Booking.findOneAndUpdate(
      { _id: query.bookingId },
      { $pull: { seat: query.seat } },
      { new: true }
    );
    return result;
  }
  if (query.bookingId && !query.seat) {
    const result = await Booking.deleteOne({ _id: query.bookingId });
    return result;
  }
};
const updateBookingIntroDB = async (
  bookingId: string,
  payload: Partial<TBooking>
) => {
  const result = await Booking.findByIdAndUpdate(bookingId, payload, {
    new: true,
  });
  return result;
};
const bookingConfirmDB = async (
  bookingId: string,
  payload: Partial<TBooking>,
  res: Response
) => {
  const bookingData = await Booking.findById(bookingId);
  const tranId = generateTansectionNumber();
  const data = {
    total_amount: bookingData?.totalAmount,
    currency: 'BDT',
    tran_id: tranId, // use unique tran_id for each api call
    success_url: `http://localhost:3000/api/v1/booking/payment/success/${bookingId}`,
    fail_url: `http://localhost:3000/api/v1/booking/payment/cencel/${bookingId}`,
    cancel_url: `http://localhost:3000/api/v1/booking/payment/cencel/${bookingId}`,
    ipn_url: 'http://localhost:3030/ipn',
    shipping_method: 'Courier',
    product_name: 'Computer.',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: 'Customer Name',
    cus_email: 'customer@example.com',
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '01711111111',
    cus_fax: '01711111111',
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  };
  const result = await Booking.updateOne(
    { _id: bookingId },
    {
      $set: {
        tranId: tranId,
        name: payload.name,
        phoneNumber: payload.phoneNumber,
      },
    }
  );
  if (result.modifiedCount > 0) {
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const paymentUrl = await sslcz.init(data).then(async (apiResponse: any) => {
      // Redirect the user to payment gateway
      const GatewayPageURL = apiResponse.GatewayPageURL;
      return GatewayPageURL;
    });
    return { url: paymentUrl };
  }
};
const paymentSuccessDB = async (bookingId: string) => {
  const result = await Booking.updateOne(
    { _id: bookingId },
    { $set: { status: 'active' } }
  );
  console.log(result, 'services success');
  return result;
};
const paymentCencelDB = async (bookingId: string) => {
  const result = await Booking.deleteOne({ _id: bookingId });
  console.log(result, 'services cencel');
  return result;
};
const bookedSeatsDB = async (query: Record<string, unknown>) => {
  console.log(query);
  const bookedSeats = await Booking.find({
    movie: query.movie,
    date: query.date,
    time: query.time,
    seatType: query.seatType,
  }).select('-_id seat');
  console.log(bookedSeats, 'bookedSeats');
  if (bookedSeats.length > 0) {
    const newBookedSeats = [].concat(
      ...bookedSeats.map((bookedSeat) => bookedSeat.seat)
    );
    console.log(newBookedSeats, 'newBookedSeats');
    return newBookedSeats;
  }
};
const getBookingByEmailDB = async (
  page: number,
  pageSize: number,
  bookingId: string,
  email: string
) => {
  if (bookingId && email) {
    const result = await Booking.findOne({
      _id: bookingId,
      email: email,
    }).populate('movie');
    return result;
  }
  const totalCount = await Booking.find({ email: email });
  const totalPages = Math.ceil(totalCount?.length / pageSize);
  const data = await Booking.find({ email: email })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .populate('movie')
    .sort({ createdAt: -1 });
  return { data, totalPages };
};

const getAllBookingDB = async (
  page: number,
  pageSize: number,
  search: string
) => {
  const searchValue: Record<string, unknown> = {};
  if (search) {
    searchValue.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }
  const totalCount = await Booking.countDocuments();
  const totalPages = Math.ceil(totalCount / pageSize);
  const data = await Booking.find(searchValue)
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .populate('movie')
    .sort({ createdAt: -1 });
  return { data, totalPages };
};

export const BookingServices = {
  createBookingIntroDB,
  deleteBookingDB,
  updateBookingIntroDB,
  bookingConfirmDB,
  paymentSuccessDB,
  paymentCencelDB,
  bookedSeatsDB,
  getBookingByEmailDB,
  getAllBookingDB,
};
