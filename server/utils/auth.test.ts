import { Request } from 'express';
import { User, authMiddleware, authRequest, signToken } from './auth';
import jwt from 'jsonwebtoken';

describe('authMiddleware', () => {
  it('should set the req.user property when a valid token is provided', () => {
    const mockReq = {
      headers: {
        authorization: `Bearer ${signToken({ username: 'testuser', email: 'testuser@test.com', _id: 'testid' })}`
      }
    };
    const result = authMiddleware({ req: mockReq as Request }) as authRequest;
    expect(result.user).toEqual({ username: 'testuser', email: 'testuser@test.com', _id: 'testid' });
  });

  it('should return the original req object when no token is provided', () => {
    const mockReq = { headers: {} };
    const result = authMiddleware({ req: mockReq as authRequest });
    expect(result).toEqual(mockReq);
  });

  it('should return the original req object when an invalid token is provided', () => {
    const mockReq = {
      headers: {
        authorization: `Bearer invalidtoken`
      }
    };
    const result = authMiddleware({ req: mockReq as Request });
    expect(result).toEqual(mockReq);
  });
});

describe('signToken', () => {
  it('should return a string', () => {
    const result = signToken({ username: 'testuser', email: 'testuser@test.com', _id: 'testid' });
    expect(typeof result).toBe('string');
  });

  it('should return a JWT token that can be decoded with the same secret', () => {
    const payload = { username: 'testuser', email: 'testuser@test.com', _id: 'testid' };
    const token = signToken(payload);
    const decoded = jwt.verify(token, process.env.AUTH_SECRET) as { data: User };
    expect(decoded.data).toEqual(payload);
  });
});
