import { TShowtime } from './showtime.interface';
import { Showtime } from './showtime.model';

//Create new movie
const createShowtimeIntroDB = async (payload: TShowtime) => {
  //If a movie already exists at the same showtime, send an error.Otherwise update showtimes
  if (await Showtime.isExistsMovieInSameDate(payload)) {
    if (await Showtime.isExistsTimeInSameDate(payload)) {
      throw new Error(
        "Movie show schedules are already fixed. If you want to change the movie show times, click the 'Shows' button, then click the 'Edit' button for the movie, and finally, change the movie show times"
      );
    }
    const result = await Showtime.findOneAndUpdate(
      { date: payload.date, movie: payload.movie },
      { $push: { showTimesTypesPrice: payload.showTimesTypesPrice[0] } },
      { new: true }
    );
    return result;
  }

  const result = await Showtime.create(payload);
  return result;
};

//Fetched all Showtime data from DB
const getAllShowtimeDB = async () => {
  const result = await Showtime.find({});
  return result;
};

//Fetched a Showtime data by ID
const getShowtimeByIdDB = async (ShowtimeId: string) => {
  const result = await Showtime.findById(ShowtimeId);
  return result;
};
const getEditDataDB = async (query: Record<string, unknown>) => {
  if (query?.showId && query?.timeTypePriceId) {
    console.log(query.showId, query.time);
    const result = await Showtime.findById(
      { _id: query.showId },
      {
        showTimesTypesPrice: { $elemMatch: { _id: query.timeTypePriceId } },
        date: 1,
      }
    ).populate('movie');

    return result;
  }
  if (query.showId) {
    const result = await Showtime.findById(query.showId)
      .select('_id date movie')
      .populate('movie');
    return result;
  }
};
//Update Showtime data
const updateShowtimeIntroDB = async (
  query: Record<string, unknown>,
  payload: Partial<TShowtime>
) => {
  if (query.timeTypePriceId) {
    const result = await Showtime.findOneAndUpdate(
      { _id: query.showId, 'showTimesTypesPrice._id': query.timeTypePriceId },
      { $set: { 'showTimesTypesPrice.$': payload?.showTimesTypesPrice[0] } },
      { new: true }
    );

    return result;
  }

  if (await Showtime.isExistsMovieInSameDate(payload)) {
    if (await Showtime.isExistsTimeInSameDate(payload)) {
      throw new Error(
        'The movie show schedule is already fixed. Please set a different showtime.'
      );
    }
    const result = await Showtime.findOneAndUpdate(
      { _id: query.showId },
      { $push: { showTimesTypesPrice: payload?.showTimesTypesPrice[0] } },
      { new: true }
    );

    return result;
  }
};

//Soft delete Showtime data from DB
const deleteShowtimeDB = async (showtimeId: string) => {
  const result = await Showtime.findOneAndUpdate(
    { _id: showtimeId },
    { isDeleted: true },
    { new: true }
  );
  return result;
};

//Update status 'active' || 'inactive' by ID
const updateStatusShowtimeDB = async (showtimeId: string, status: string) => {
  const result = await Showtime.findOneAndUpdate(
    { _id: showtimeId },
    { status: status },
    { new: true }
  );
  return result;
};

//User Services//

//Get all active showtimes
const getAllActiveShowtimeDateDB = async () => {
  const result = await Showtime.distinct('date', { status: 'active' });
  return result;
};

//Fetched all active movies
const getAllAciveMoviesDB = async (query: Record<string, unknown>) => {
  const result = await Showtime.find({
    date: query.date,
    status: 'active',
  }).populate('movie');
  return result;
};
//Fetched active movie by id
const getAciveMovieByIdDB = async (showtimeId: string) => {
  const result = await Showtime.findOne({
    _id: showtimeId,
    status: 'active',
  }).populate('movie');
  return result;
};

//Fetched active seat types for the movie
const getAciveSeatTypesDB = async (query: Record<string, unknown>) => {
  const result = await Showtime.findById(
    { _id: query.showId },
    { showTimesTypesPrice: { $elemMatch: { _id: query.timeTypePriceId } } }
  ).populate('movie');
  return result;
};

export const ShowtimeServices = {
  createShowtimeIntroDB,
  getAllShowtimeDB,
  getShowtimeByIdDB,
  deleteShowtimeDB,
  getEditDataDB,
  updateShowtimeIntroDB,
  updateStatusShowtimeDB,
  getAllActiveShowtimeDateDB,
  getAllAciveMoviesDB,
  getAciveMovieByIdDB,
  getAciveSeatTypesDB,
};
