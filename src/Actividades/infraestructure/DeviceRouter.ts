import { Router } from 'express';
import { deviceController } from '../infraestructure/dependencies'; 

const deviceRouter = (): Router => {
  const router = Router();

  //agrega un dispositivoo
  router.post('/add', async (req, res) => {
    await deviceController.addDevice(req, res);
  });

  //obtiene los dispositivos 
  router.get('/list', async (req, res) => {
    await deviceController.getDevices(req, res);
  });

  //cambiar el status del sipositivo
  router.put('/trigger/:deviceId', async (req, res) => {
    await deviceController.triggerDevice(req, res);
  });


  return router;
};

export default deviceRouter;
