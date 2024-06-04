import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUserIntro = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntroDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Successfull Sign Up.',
    data: result,
  });
});
const getAllUser = catchAsync(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;
  const search = req.query.search;
  const result = await UserServices.getAllUserDB(
    page,
    pageSize,
    search as string
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Successfull Fetched All User.',
    data: result,
  });
});
const getUserByEmail = catchAsync(async (req, res) => {
  const { email } = req.body;
  const result = await UserServices.getUserByEmailDB(email as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Successfull User By Email.',
    data: result,
  });
});

const updateUserRole = catchAsync(async (req, res) => {
  const result = await UserServices.updateUserRoleDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Successfull Role Updated.',
    data: result,
  });
});

export const UserControllers = {
  createUserIntro,
  getAllUser,
  getUserByEmail,
  updateUserRole,
};
