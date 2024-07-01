import { Router } from 'express';
import verifyToken from '../../Users/infrastructure/middleware/VerifyToken';
import { deviceController } from '../infraestructure/dependencies';
import { authService } from '../../Users/infrastructure/dependencies';

const deviceRouter = (): Router => {
  const router = Router();

  // Agregar un dispositivo requiere autenticación y verificación del token
  router.post('/add', verifyToken(authService), async (req, res) => {
    // Verificar el rol del usuario para permitir o no la acción
    if (req.user?.rol !== 'admin') {
      return res.status(403).json({ message: 'Acceso no autorizado' });
    }
    await deviceController.addDevice(req, res);
  });

  // Obtiene los dispositivos 
  router.get('/list', async (req, res) => {
    await deviceController.getDevices(req, res);
  });

  // Cambia el status del dispositivo 
  router.put('/trigger/:deviceId', verifyToken(authService), async (req, res) => {
    await deviceController.triggerDevice(req, res);
  });

  return router;
};

export default deviceRouter;
