import mongoose, { Schema, model } from 'mongoose';
import {
  ShowtimeModel,
  TSeatTypePrice,
  TShowTimeTypePrice,
  TShowtime,
} from './showtime.interface';

const seatTypePriceSchema = new Schema<TSeatTypePrice>({
  seatType: { type: String, required: true },
  price: { type: Number, required: true },
});

const showTimeTypePriceSchema = new Schema<TShowTimeTypePrice>({
  time: { type: String, required: true },
  seatTypesPrice: { type: [seatTypePriceSchema], required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
});
const showtimesSchema = new Schema<TShowtime, ShowtimeModel>(
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
    isDeleted: {
      type: Boolean,
      default: false,
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

showtimesSchema.static(
  'isExistsMovieInSameDate',
  async function (payload: TShowtime) {
    const movieExists = await Showtime.findOne({
      date: payload.date,
      movie: payload.movie,
    });
    return movieExists;
  }
);
showtimesSchema.static(
  'isExistsTimeInSameDate',
  async function (payload: TShowtime) {
    const timeExists = await Showtime.findOne({
      date: payload.date,
      movie: payload.movie,
      showTimesTypesPrice: {
        $elemMatch: { time: payload?.showTimesTypesPrice[0]?.time },
      },
    });
    console.log(timeExists, payload, payload?.showTimesTypesPrice[0]?.time);
    return timeExists;
  }
);

export const Showtime = model<TShowtime, ShowtimeModel>(
  'Showtime',
  showtimesSchema
);
