import jwt from 'jsonwebtoken';
import { Request } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const secret: string = process.env.AUTH_SECRET;
const expiration: string = '2h';

export interface User {
  username: string;
  email: string;
  _id: string;
}

interface DecodedData {
  data: User;
}

interface DecodedToken {
  data: {
    username: string;
    email: string;
    _id: string;
  };
}

export interface authRequest extends Request {
  user?: User;
}

interface AuthMiddlewareArgs {
  req: authRequest;
}

export const authMiddleware = function ({ req }: AuthMiddlewareArgs): Request | authRequest {
  let token: string | undefined = req?.body?.token || req?.query?.token || req?.headers?.authorization;

  if (req.headers.authorization) {
    token = token?.split(' ').pop()?.trim();
  }

  if (!token) {
    return req;
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration }) as DecodedData;
    req.user = data;
  } catch {
    console.log('Invalid token');
  }

  return req;
};

export const signToken = function ({ username, email, _id }: User): string {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};
