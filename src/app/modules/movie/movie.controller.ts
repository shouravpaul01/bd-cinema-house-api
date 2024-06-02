import { MovieServices } from './movie.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import handleFileUpload from '../../utils/handleFileUpload';
import { MovieValidation } from './movie.validation';
import { Movie } from './movie.model';
import { handleDeleteFile } from '../../utils/handleDeleteFile';

//Create a Movie
const createMovieIntro = catchAsync(async (req, res) => {
  const formData = JSON.parse(req.body.newMovie);
  if (!req.file) {
    throw new Error('Failed to create movie .');
  }
  const movieValidation = MovieValidation.createMovieValidationSchema.parse({
    body: formData,
  });
  // File upload
  const cloudinaryResult = await handleFileUpload(req?.file?.path);

  movieValidation.body['image'] = {
    public_id: cloudinaryResult.public_id,
    url: cloudinaryResult.secure_url,
  };
  console.log(formData, movieValidation, 'eee');
  const result = await MovieServices.createMovieIntroDB(movieValidation?.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Successfully movie created.',
    data: result,
  });
});

//Fetched All movie
const getAllMovie = catchAsync(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;
  const search = req.query.search;
  const result = await MovieServices.getAllMovieDB(search, page, pageSize);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Successfully fetched all Movies.',
    data: result,
  });
});

//Fetched Movie data by ID
const getMovieById = catchAsync(async (req, res) => {
  const { movieId } = req.params;
  const result = await MovieServices.getMovieByIdDB(movieId);
  console.log(result, movieId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Successfully fetched Movie.',
    data: result,
  });
});

//Update movie data
const updateMovieIntro = catchAsync(async (req, res) => {
  const { movieId } = req.params;
  const formData = JSON.parse(req.body.newMovie);

  //Check if there is a file in req.body. If there is a file, first delete the file from Cloudinary and then store the new file in Cloudinary.
  const movieValidation = MovieValidation.updateMovieValidationSchema.parse({
    body: formData,
  });
  if (!req.file) {
    delete movieValidation.body['image'];
  } else if (req.file) {
    const findData = await Movie.findById(movieId);
    await handleDeleteFile(findData?.image?.public_id);
    const cloudinaryResult = await handleFileUpload(req?.file?.path);
    console.log(cloudinaryResult);
    movieValidation.body['image'] = {
      public_id: cloudinaryResult.public_id,
      url: cloudinaryResult.secure_url,
    };
  }
  console.log(formData, movieId, req.file);

  const result = await MovieServices.updateMovieIntroDB(
    movieId,
    movieValidation?.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Successfully Updated Movie.',
    data: result,
  });
});

//Soft delete movie data.
const deleteMovie = catchAsync(async (req, res) => {
  const { movieId } = req.params;
  const result = await MovieServices.deleteMovieDB(movieId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Successfully Movie Deleted.',
    data: result,
  });
});

//Update movie status.
const updateStatusMovie = catchAsync(async (req, res) => {
  const { movieId } = req.params;
  const { status } = req.query;
  console.log(status);
  const result = await MovieServices.updateStatusMovieDB(
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
export const MovieControllers = {
  createMovieIntro,
  getAllMovie,
  getMovieById,
  updateMovieIntro,
  deleteMovie,
  updateStatusMovie,
};
