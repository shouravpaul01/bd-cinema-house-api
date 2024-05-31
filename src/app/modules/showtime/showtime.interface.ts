import { Types } from 'mongoose';

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
  status: 'active' | 'inactive';
};
