import { NextFunction, Response } from 'express';
import AuthService from '../../aplication/Services/AuthService';
import { AuthenticatedRequest } from '../../../../src/types'; 
import { activityController } from '../dependencies';

const verifyToken = (authService: AuthService) => async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];

  if (!token) {
    req.verified = false;
    await activityController.logSuspiciousActivity({
      userId: 'unknown',
      action: 'Unauthorized access no token',
      timestamp: new Date(),
    });
    return res.status(401).json({ message: 'No token provided' });
  } else {
    try {
      const user = await authService.verifyToken(token);
      if (!user) {
        req.verified = false;
        await activityController.logSuspiciousActivity({
          userId: 'unknown',
          action: 'Unauthorized access attempt (invalid token)',
          timestamp: new Date(),
        });
        return res.status(401).json({ message: 'Invalid token' });
      } else {
        req.user = user;
        req.verified = true;
      }
      next();
    } catch (err: unknown) {
      req.verified = false;
      await activityController.logSuspiciousActivity({
        userId: 'unknown',
        action: `Error verifying token: ${err instanceof Error ? err.message : 'Unknown error'}`,
        timestamp: new Date(),
      });
      return res.status(500).json({ message: 'Error verifying token' });
    }
  }
};

export default verifyToken;
