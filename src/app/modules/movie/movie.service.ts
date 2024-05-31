import { TMovie } from './movie.interface';
import { Movie } from './movie.model';

const createMovieIntroDB = async (payload: TMovie) => {
  const result = await Movie.create(payload);
  return result;
};
const getAllMovieDB = async () => {
  const result = await Movie.find({});
  return result;
};
const getMovieByIdDB = async (movieId: string) => {
  const result = await Movie.findById(movieId);
  return result;
};
const updateMovieIntroDB = async (
  movieId: string,
  payload: Partial<TMovie>
) => {
  const result = await Movie.findOneAndUpdate({ _id: movieId }, payload, {
    new: true,
  });
  return result;
};
const deleteMovieDB = async (movieId: string) => {
  const result = await Movie.findOneAndUpdate(
    { _id: movieId },
    { isDeleted: true },
    { new: true }
  );
  return result;
};
const updateStatusMovieDB = async (movieId: string, payload: string) => {
  console.log(payload);
  const result = await Movie.findOneAndUpdate(
    { _id: movieId },
    { status: payload },
    { new: true }
  );
  return result;
};
export const MovieServices = {
  createMovieIntroDB,
  getAllMovieDB,
  getMovieByIdDB,
  updateMovieIntroDB,
  deleteMovieDB,
  updateStatusMovieDB,
};
