import dotenv from 'dotenv';
dotenv.config();

export const config = {
  httpport: Number(process.env.HTTP_PORT) || 3001,
  wsport:  Number(process.env.WS_PORT) || 8080,
  jwtSecret: process.env.JWT_SECRET || 'default-secret',
  dbUrl: process.env.DATABASE_URL || '',
};
