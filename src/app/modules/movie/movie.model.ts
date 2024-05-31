import { Schema, model } from 'mongoose';
import { TMovie } from './movie.interface';

const movieSchema = new Schema<TMovie>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    movieUrl: {
      type: String,
      required: true,
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
export const Movie = model<TMovie>('Movie', movieSchema);
