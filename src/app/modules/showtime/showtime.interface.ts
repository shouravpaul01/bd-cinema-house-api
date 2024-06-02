import { Model, Types } from 'mongoose';

export type TSeatTypePrice = {
  seatType: string;
  price: number;
};

export type TShowTimeTypePrice = {
  time: string;
  seatTypesPrice: TSeatTypePrice[];
  status: 'active' | 'inactive';
};

export type TShowtime = {
  date: Date;
  movie: Types.ObjectId;
  showTimesTypesPrice: TShowTimeTypePrice[];
  isDeleted: boolean;
  status: 'active' | 'inactive';
};

export interface ShowtimeModel extends Model<TShowtime> {
  isExistsMovieInSameDate(payload: TShowtime): Promise<TShowtime | null>;
  isExistsTimeInSameDate(payload: TShowtime): Promise<TShowtime | null>;
}
