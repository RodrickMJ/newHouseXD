import MongoDispositivoRepository from './MongoDispositivoRepository';
import CreateDispositivoUseCase from '../aplication/CreateDispositivoUseCase';
import GetDispositivosUseCase from '../aplication/GetDispositivosUseCase';
import UpdateDispositivoUseCase from '../aplication/UpdateDispositivoUseCase';
import DeleteDispositivoUseCase from '../aplication/DeleteDispositivoUseCase';

import CreateDispositivoController from './controllers/CreateDispositivoController';
import GetDispositivosController from './controllers/GetDispositivosController';
import UpdateDispositivoController from './controllers/UpdateDispositivoController';
import DeleteDispositivoController from './controllers/DeleteDispositivoController';

const dispositivoRepository = new MongoDispositivoRepository();

const createDispositivoUseCase = new CreateDispositivoUseCase(dispositivoRepository);
const getDispositivosUseCase = new GetDispositivosUseCase(dispositivoRepository);
const updateDispositivoUseCase = new UpdateDispositivoUseCase(dispositivoRepository);
const deleteDispositivoUseCase = new DeleteDispositivoUseCase(dispositivoRepository);

export const createDispositivoController = new CreateDispositivoController(createDispositivoUseCase);
export const getDispositivosController = new GetDispositivosController(getDispositivosUseCase);
export const updateDispositivoController = new UpdateDispositivoController(updateDispositivoUseCase);
export const deleteDispositivoController = new DeleteDispositivoController(deleteDispositivoUseCase);