import { TBooking } from './booking.interface';
import { Booking } from './booking.model';

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
