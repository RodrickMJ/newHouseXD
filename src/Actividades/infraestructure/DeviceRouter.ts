import { Router } from 'express';

import verifyToken from '../../Users/infrastructure/middleware/VerifyToken';
import { deviceController} from '../infraestructure/dependencies';
import { authService } from '../../Users/infrastructure/dependencies';


const deviceRouter = (): Router => {
  const router = Router();

  // Agregar un dispositivo requiere autenticación y verificación del token
  router.post('/add', verifyToken(authService), async (req, res) => {
    // Verificar el rol del usuario para que permita o no la accion
    if (req.user?.rol !== 'admin') {
      return res.status(403).json({ message: 'Acceso no autorizado' });
    }
    await deviceController.addDevice(req, res);
  });

  //obtiene los dispositivos 
  router.get('/list', async (req, res) => {
    await deviceController.getDevices(req, res);
  });

  //cambia el status del sipositivo
  router.put('/trigger/:deviceId', async (req, res) => {
    await deviceController.triggerDevice(req, res);
  });

  

  return router;
};

export default deviceRouter;
