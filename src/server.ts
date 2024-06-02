import mongoose from 'mongoose';
import app from './app';
import { config } from './app/config';
import { v2 as cloudinary } from 'cloudinary';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    cloudinary.config({
      cloud_name: config.cloud_name,
      api_key: config.api_key,
      api_secret: config.appi_secret,
    });
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
