import { TMovie } from './movie.interface';
import { Movie } from './movie.model';

//Create new movie
const createMovieIntroDB = async (payload: TMovie) => {
  const result = await Movie.create(payload);
  return result;
};

//Fetched all movie data from DB
const getAllMovieDB = async (
  search: string,
  page: number,
  pageSize: number,
  isDeleted: boolean
) => {
  const searchValue: Record<string, unknown> = {};
  if (search) {
    searchValue.name = { $regex: search, $options: 'i' };
  } else if (isDeleted) {
    searchValue.isDeleted = isDeleted;
  }
  if (!search && !page) {
    const result = await Movie.find({ status: 'active' });
    return result;
  }

  const totalCount = await Movie.countDocuments();
  const totalPages = Math.ceil(totalCount / pageSize);
  const data = await Movie.find(searchValue)
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  return { data, totalPages };
};

//Fetched a movie data by ID
const getMovieByIdDB = async (movieId: string) => {
  const result = await Movie.findById(movieId);
  return result;
};

//Update movie data
const updateMovieIntroDB = async (
  movieId: string,
  payload: Partial<TMovie>
) => {
  const result = await Movie.findOneAndUpdate({ _id: movieId }, payload, {
    new: true,
  });
  return result;
};

//Soft delete movie data from DB
const deleteMovieDB = async (movieId: string) => {
  const result = await Movie.findOneAndUpdate(
    { _id: movieId },
    { isDeleted: true },
    { new: true }
  );
  return result;
};

//Update status 'active' || 'inactive' by ID
const updateStatusMovieDB = async (movieId: string, payload: string) => {
  const result = await Movie.findOneAndUpdate(
    { _id: movieId },
    { status: payload },
    { new: true }
  );
  return result;
};

const singleRestoreDB = async (movieId: string) => {
  const result = await Movie.findOneAndUpdate(
    { _id: movieId },
    { isDeleted: false },
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
  singleRestoreDB,
};
