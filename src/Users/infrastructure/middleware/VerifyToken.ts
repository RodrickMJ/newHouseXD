import { Request, Response, NextFunction } from 'express';
import AuthService from '../../aplication/Services/AuthService';


interface AuthenticatedRequest extends Request {
  user?: any; 
}

const verifyToken = (authService: AuthService) => async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send('Token required');
  }

  try {
    const user = await authService.verifyToken(token); 
    if (!user) {
      return res.status(401).send('Invalid token');
    }

    
    req.user = user;

    next();
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(401).send(err.message);
    } else {
      res.status(500).send('Unknown error');
    }
  }
};

export default verifyToken;