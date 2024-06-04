import mongoose, { Schema, model } from 'mongoose';

const bookingSchema = new Schema(
  {
    email: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
    },
    hallName: {
      type: String,
      default: 'BD-Cinema-house',
    },
    time: {
      type: String,
    },
    seatType: {
      type: String,
    },
    seat: {
      type: Array,
    },
    date: {
      type: Date,
    },
    totalAmount: {
      type: Number,
    },
    tranId: {
      type: String,
    },
    status: {
      type: String,
      default: 'inactive',
    },
  },
  {
    timestamps: true,
  }
);

export const Booking = model('Booking', bookingSchema);
