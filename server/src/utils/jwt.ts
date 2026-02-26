import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config';

export interface TokenPayload {
  userId: string;
  role: string;
}

export function signToken(payload: TokenPayload): string {
  // jwt.sign accepts SignOptions; specifying type to satisfy TS
  // cast to satisfy the ms.StringValue branded type
  const opts: jwt.SignOptions = { expiresIn: JWT_EXPIRES_IN as unknown as jwt.SignOptions['expiresIn'] };
  return jwt.sign(payload, JWT_SECRET as jwt.Secret, opts);
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
}
