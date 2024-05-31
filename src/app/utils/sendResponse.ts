import { Response } from 'express';

type TSendResponse<T> = {
  statusCode: number;
  status: boolean;
  message: string;
  data: T;
};
const sendResponse = <T>(res: Response, data: TSendResponse<T>) => {
  res.status(data?.statusCode).json({
    status: data?.status,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;
