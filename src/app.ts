import express from 'express';
import cors from 'cors';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { MovieRoutes } from './app/modules/movie/movie.route';
import { ShowtimesRoutes } from './app/modules/showtime/showtime.route';
import { UserRoutes } from './app/modules/user/user.route';
import { BookingRoutes } from './app/modules/booking/booking.route';

const app = express();

//Parser
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/movies', MovieRoutes);
app.use('/api/v1/showtimes', ShowtimesRoutes);
app.use('/api/v1/booking', BookingRoutes);

app.get('/', (req, res) => {
  const a = 10;
  res.send('Hello World!');
});

//Global error handler
app.use(globalErrorHandler);

export default app;
