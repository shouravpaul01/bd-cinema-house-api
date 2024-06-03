export type TUser = {
  name: string;
  email: string;
  phoneNumber?: number;
  role?: 'User' | 'Admin';
};
