import { Router } from 'express';
import { createDispositivoController,getDispositivosController,updateDispositivoController,deleteDispositivoController} from './dependencies';

const dispositivoRouter = Router();

dispositivoRouter.post('/', createDispositivoController.createDispositivo.bind(createDispositivoController));
dispositivoRouter.get('/', getDispositivosController.getDispositivos.bind(getDispositivosController));
dispositivoRouter.put('/:id', updateDispositivoController.updateDispositivo.bind(updateDispositivoController));
dispositivoRouter.delete('/:id', deleteDispositivoController.deleteDispositivo.bind(deleteDispositivoController));

export default dispositivoRouter;