import dotenv from 'dotenv';
dotenv.config();

export const CREDENTIALS = {
   VALID_USER: {
      USERNAME: process.env.USER_NAME,
      PASSWORD: process.env.PASSWORD,
   },

   INVALID_USER: {
      USERNAME: process.env.INVALID_USERNAME,
      PASSWORD: process.env.INVALID_PASSWORD,
   },
};
