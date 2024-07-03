import CreateActivityUseCase from '../aplication/CreateActivityUseCase';
import MongoActivityRepository from './MongoActivityRepository';
import getActivitiesHistory from '../aplication/GetActivitiesHistory';
import CreateActivityController from './controllers/CreateActivityController';
import GetActivityController from './controllers/GetActivityController';

export const mongoActivityRepository = new MongoActivityRepository();

export const createActivityUseCase = new CreateActivityUseCase(mongoActivityRepository);
export const getActivityesHistory = new getActivitiesHistory(mongoActivityRepository);

export const createActivityController = new CreateActivityController(createActivityUseCase);
export const GetActivityesHistory = new GetActivityController(getActivityesHistory);