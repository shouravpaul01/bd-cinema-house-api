import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
    },
    role: {
      type: String,
      enum: ['User', 'Admin'],
      default: 'User',
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  const isEmailExists = await User.findOne({ email: this.email });
  if (isEmailExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'email',
      'Aready the email is exists.'
    );
  }
  next();
});
export const User = model<TUser>('User', userSchema);
