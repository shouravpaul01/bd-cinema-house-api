import { v2 as cloudinary } from 'cloudinary';

export const handleDeleteFile = async (public_id: string | undefined) => {
  await cloudinary.uploader.destroy(public_id);
};
