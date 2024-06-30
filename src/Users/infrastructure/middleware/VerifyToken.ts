import { NextFunction, Response } from 'express';
import AuthService from '../../aplication/Services/AuthService';
import { AuthenticatedRequest } from '../../../../src/types'; 
import { activityController } from '../dependencies'; 

const verifyToken = (authService: AuthService) => async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
 //si no hay token 
  if (!token) {
    req.verified = false;
    await activityController.logSuspiciousActivity({
      userId: 'desconocido',
      action: 'Unauthorized access no token',
      timestamp: new Date(),
    });
    next();
  } else {
    try {
      //por si hay token pero no es valido
      const user = await authService.verifyToken(token);
      if (!user) {
        req.verified = false;
        await activityController.logSuspiciousActivity({
          userId: 'desconocido ',
          action: 'Unauthorized access attempt (invalid token)',
          timestamp: new Date(),
        });
        //si es valido lo añade y no hay sospecha
      } else {
        req.user = user;
        req.verified = true;
      }
      next();
      //caso de error al verificar el token
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
