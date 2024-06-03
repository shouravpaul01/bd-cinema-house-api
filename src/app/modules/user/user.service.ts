import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntroDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};
const getAllUserDB = async (page: number, pageSize: number, search: string) => {
  const searchValue: Record<string, unknown> = {};
  if (search) {
    searchValue.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  const totalCount = await User.countDocuments();
  const totalPages = Math.ceil(totalCount / pageSize);
  const data = await User.find(searchValue)
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  return { data, totalPages };
};
const getUserByEmailDB = async (email: string) => {
  const result = await User.findOne({ email: email });
  return result;
};
const updateUserRoleDB = async (query: Record<string, unknown>) => {
  const result = await User.findByIdAndUpdate(
    query._id,
    { role: query.role },
    { new: true }
  );
  return result;
};
export const UserServices = {
  createUserIntroDB,
  getAllUserDB,
  getUserByEmailDB,
  updateUserRoleDB,
};
