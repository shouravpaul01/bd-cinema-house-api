import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserVlaidation } from './user.validation';
import { User } from './user.model';
const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserVlaidation.createUserValidationSchema),
  UserControllers.createUserIntro
);
router.get('/', UserControllers.getAllUser);
router.get('/verify-email', UserControllers.getUserByEmail);
router.patch('/update-role', UserControllers.updateUserRole);

export const UserRoutes = router;
