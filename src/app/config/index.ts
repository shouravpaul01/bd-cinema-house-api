import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  appi_secret: process.env.API_SECRET,
  SSLCOMMERZ_STOREID: process.env.SSLCOMMERZ_STOREID,
  SSLCOMMERZ_PASSWORD: process.env.SSLCOMMERZ_PASSWORD,
};
