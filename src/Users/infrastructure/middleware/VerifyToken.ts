
import { NextFunction, Response } from 'express';
import AuthService from '../../aplication/Services/AuthService';
import { AuthenticatedRequest } from '../../../../src/types'; 

const verifyToken = (authService: AuthService) => async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];

  if (!token) {
    req.verified = false;
    return next();
  }

  try {
    const user = await authService.verifyToken(token);
    if (!user) {
      req.verified = false;
    } else {
      req.user = user;
      req.verified = true;
    }
    next();
  } catch (err: unknown) {
    req.verified = false;
    next();
  }
};


export default verifyToken;

