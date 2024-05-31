import mongoose, { Schema, model } from 'mongoose';
import { TShowtime } from './showtime.interface';

const seatTypePriceSchema = new Schema<TSeatTypePrice>({
  seatType: { type: String, required: true },
  price: { type: Number, required: true },
});

const showTimeTypePriceSchema = new Schema<TShowTimeTypePrice>({
  time: { type: String, required: true },
  seatTypesPrice: { type: [seatTypePriceSchema], required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
});
const showtimesSchema = new Schema<TShowtime>(
  {
    date: {
      type: Date,
      required: true,
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
      required: true,
    },
    showTimesTypesPrice: {
      type: [showTimeTypePriceSchema],
    },

    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'inactive',
    },
  },
  {
    timestamps: true,
  }
);

export const Showtime = model<TShowtime>('Showtime', showtimesSchema);
