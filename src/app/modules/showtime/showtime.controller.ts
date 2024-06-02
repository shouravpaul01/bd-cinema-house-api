import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { ShowtimeServices } from './showtime.service';
import sendResponse from '../../utils/sendResponse';
import handleFileUpload from '../../utils/handleFileUpload';
import { UploadApiErrorResponse } from 'cloudinary';
import { UploadApiResponse } from 'cloudinary';

//Create a Movie
const createShowtimeIntro = catchAsync(async (req, res) => {
  const result = await ShowtimeServices.createShowtimeIntroDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Successfully set movie showtimes.',
    data: result,
  });
});

//Fetched All movie
const getAllShowtime = catchAsync(async (req, res) => {
  const result = await ShowtimeServices.getAllShowtimeDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Successfully fetched all Movie Showtimes.',
    data: result,
  });
});

//Fetched Movie data by ID
const getShowtimeById = catchAsync(async (req, res) => {
  const { showtimeId } = req.params;
  const result = await ShowtimeServices.getShowtimeByIdDB(showtimeId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Successfully fetched Movie.',
    data: result,
  });
});

const getEditData = catchAsync(async (req, res) => {
  const result = await ShowtimeServices.getEditDataDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Successfully fetched Movie.',
    data: result,
  });
});
//Update movie data
const updateMovieIntro = catchAsync(async (req, res) => {
  const result = await ShowtimeServices.updateShowtimeIntroDB(
    req.query,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Successfully Updated Movie.',
    data: result,
  });
});

//Soft delete showrime data.
const deleteShowtime = catchAsync(async (req, res) => {
  const { movieId } = req.params;
  const result = await ShowtimeServices.deleteShowtimeDB(movieId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Successfully Movie Deleted.',
    data: result,
  });
});

//Update movie status.
const updateStatusShowtime = catchAsync(async (req, res) => {
  const { movieId } = req.params;
  const { status } = req.query;

  const result = await ShowtimeServices.updateStatusShowtimeDB(
    movieId,
    status as string
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Successfully Updated Movie Status.',
    data: result,
  });
});

//User Controller //

const getAllActiveShowtimeDate = catchAsync(async (req, res) => {
  const result = await ShowtimeServices.getAllActiveShowtimeDateDB();
  return result;
});

//Fetched all active movies
const getAllActiveMovies = catchAsync(async (req, res) => {
  const result = await ShowtimeServices.getAllAciveMoviesDB(req.query);
  return result;
});
//Fetched all active movie by id
const getAciveMovieById = catchAsync(async (req, res) => {
  const { showtimeId } = req.params;
  const result = await ShowtimeServices.getAciveMovieByIdDB(showtimeId);
  return result;
});

//Fetched active seat types for the movie
const getAciveSeatTypes = catchAsync(async (req, res) => {
  const result = await ShowtimeServices.getAciveSeatTypesDB(req.query);
  return result;
});
export const ShowTimeControllers = {
  createShowtimeIntro,
  getAllShowtime,
  getShowtimeById,
  deleteShowtime,
  getEditData,
  updateMovieIntro,
  updateStatusShowtime,
  getAllActiveShowtimeDate,
  getAllActiveMovies,
  getAciveMovieById,
  getAciveSeatTypes,
};
