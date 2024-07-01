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
    next();
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
      } else {
        req.user = user;
        req.verified = true;
        // Aqui verifica si el usuario tiene el rol de administrador
        if (user.rol !== 'admin') {
          return res.status(403).json({ message: 'Acceso no autorizado' });
        }
      }
      next();
    } catch (err: unknown) {
      req.verified = false;
      await activityController.logSuspiciousActivity({
        userId: 'unknown',
        action: `Error verifying token: ${err instanceof Error ? err.message : ' error'}`,
        timestamp: new Date(),
      });
      next();
    }
  }
};

export default verifyToken;
