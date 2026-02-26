import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const JWT_SECRET = process.env.JWT_SECRET || 'change_me';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '10');

export const DATABASE_URL = process.env.DATABASE_URL || '';
