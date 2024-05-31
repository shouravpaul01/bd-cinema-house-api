import { MovieServices } from './movie.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createMovieIntro = catchAsync(async (req, res) => {
  const result = await MovieServices.createMovieIntroDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Successfully movie created.',
    data: result,
  });
});
const getAllMovie = catchAsync(async (req, res) => {
  const result = await MovieServices.getAllMovieDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Successfully fetched all Movies.',
    data: result,
  });
});
const getMovieById = catchAsync(async (req, res) => {
  const { movieId } = req.params;
  const result = await MovieServices.getMovieByIdDB(movieId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Successfully fetched Movie.',
    data: result,
  });
});
const updateMovieIntro = catchAsync(async (req, res) => {
  const { movieId } = req.params;
  const result = await MovieServices.updateMovieIntroDB(movieId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Successfully Updated Movie.',
    data: result,
  });
});
export const MovieControllers = {
  createMovieIntro,
  getAllMovie,
  getMovieById,
  updateMovieIntro,
};
