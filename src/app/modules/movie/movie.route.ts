import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { MovieValidation } from './movie.validation';
import { MovieControllers } from './movie.controller';
const router = express.Router();

router.post(
  '/create-movie',
  validateRequest(MovieValidation.createMovieValidationSchema),
  MovieControllers.createMovieIntro
);
router.get('/', MovieControllers.getAllMovie);
router.get('/:movieId', MovieControllers.getMovieById);
router.patch(
  '/:movieId',
  validateRequest(MovieValidation.updateMovieValidationSchema),
  MovieControllers.updateMovieIntro
);

export const MovieRoutes = router;