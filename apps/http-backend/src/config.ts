import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: Number(process.env.PORT) || 3001,
  jwtSecret: process.env.JWT_SECRET || 'default-secret',
  dbUrl: process.env.DATABASE_URL || '',
};
