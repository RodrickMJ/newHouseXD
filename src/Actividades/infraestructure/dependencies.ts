import MongoActivityRepository from './MongoActivityRepository';
import LogActivityUseCase from '../aplication/LogActivityUseCase';
import ActivityController from './controllers/ActivityController';
import ActivityService from './controllers/ActivityService';

const activityRepository = new MongoActivityRepository();

const logActivityUseCase = new LogActivityUseCase(activityRepository);

const activityController = new ActivityController(logActivityUseCase);
const activityService = new ActivityService(activityRepository);

export {
    activityRepository,
    logActivityUseCase,
    activityController,
    activityService
};
