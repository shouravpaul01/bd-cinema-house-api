import express from 'express';
import cors from 'cors';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { MovieRoutes } from './app/modules/movie/movie.route';

const app = express();

//Parser
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/v1/movies', MovieRoutes);
app.get('/', (req, res) => {
  const a = 10;
  res.send('Hello World!');
});

//Global error handler
app.use(globalErrorHandler);

export default app;
