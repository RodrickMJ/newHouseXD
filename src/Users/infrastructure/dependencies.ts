import MongoUserRepository from './MongoUserRepository';
import AuthService from '../aplication/Services/AuthService';
import AuthenticateUser from '../aplication/AuthenticateUser';
import CreateUserCase from '../aplication/CreateUseCase';
import CreateUserController from './controllers/CreateControllers';
import ByIdUserController from './controllers/GetByCredencials'; 
import getByUseCase from '../aplication/GetByUseCase';

const authService = new AuthService(process.env.SECRET_JWT || 'defaultSecretKey');
const userRepository = new MongoUserRepository();
const authenticateUser = new AuthenticateUser(userRepository, authService);
const createUserCase = new CreateUserCase(userRepository);
const createUserController = new CreateUserController(createUserCase);
const getUserByIdUseCase = new getByUseCase(userRepository); 
const byIdUserController = new ByIdUserController(getUserByIdUseCase); 

export {
    authService,
    authenticateUser,
    createUserController,
    byIdUserController
};
