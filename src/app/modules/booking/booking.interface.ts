import { Types } from 'mongoose';

export type TBooking = {
  email: string;
  name: string;
  phoneNumber: number;
  movie: Types.ObjectId;
  hallName: string;
  time: string;
  seatType: string;
  seat: any[];
  date: Date;
  totalAmount: number;
  tranId: string;
  status: string;
};
