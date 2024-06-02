import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { MovieValidation } from './movie.validation';
import { MovieControllers } from './movie.controller';
import { singleFile } from '../../middlewares/handleSingleFile';
const router = express.Router();

router.post('/create-movie', singleFile, MovieControllers.createMovieIntro);
router.get('/', MovieControllers.getAllMovie);
router.get('/:movieId', MovieControllers.getMovieById);
router.patch('/:movieId', singleFile, MovieControllers.updateMovieIntro);
router.delete('/:movieId', MovieControllers.deleteMovie);
router.patch('/update-status/:movieId', MovieControllers.updateStatusMovie);
export const MovieRoutes = router;
