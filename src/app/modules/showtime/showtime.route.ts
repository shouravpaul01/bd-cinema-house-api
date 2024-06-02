import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ShowtimeValidation } from './showtime.validation';
import { ShowTimeControllers } from './showtime.controller';

const router = express.Router();

router.post(
  '/create-movie-showtime',
  validateRequest(ShowtimeValidation.createShowtimeValidationSchema),
  ShowTimeControllers.createShowtimeIntro
);
router.get('/', ShowTimeControllers.getAllShowtime);
router.get('/:movieId', ShowTimeControllers.getShowtimeById);
router.patch(
  '/:movieId',
  validateRequest(ShowtimeValidation.updateShowtimeValidationSchema),
  ShowTimeControllers.updateMovieIntro
);
router.delete('/:showtimeId', ShowTimeControllers.deleteShowtime);
router.patch(
  '/update-status/:showtimeId',
  ShowTimeControllers.updateStatusShowtime
);

router.get(
  '/active-movie-show-date',
  ShowTimeControllers.getAllActiveShowtimeDate
);
router.get('/active-movies-by-date', ShowTimeControllers.getAllActiveMovies);
router.get(
  '/active-movie-by-id/:showtimeId',
  ShowTimeControllers.getAciveMovieById
);
router.get(
  '/active-movie-seat-type-by-id',
  ShowTimeControllers.getAciveSeatTypes
);
export const ShowtimesRoutes = router;
