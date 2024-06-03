import { Schema, model } from 'mongoose';
import { TMovie } from './movie.interface';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';

const movieSchema = new Schema<TMovie>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    category: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },
    rating: { type: Number, required: true, min: 0, max: 10 },
    actors: { type: [String], required: true },
    genres: {
      type: [String],
      required: true,
    },
    languages: {
      type: [String],
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
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
movieSchema.pre('save', async function (next) {
  const isTitleExists = await Movie.findOne({ title: this.title });
  if (isTitleExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'title',
      'Aready the movie title is exists.'
    );
  }
  next();
});
export const Movie = model<TMovie>('Movie', movieSchema);
