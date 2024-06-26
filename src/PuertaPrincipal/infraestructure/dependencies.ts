import MongoActivityRepository from './MongoActivityRepository';
import ActivityService from './controllers/ActivityService';
import ActivityController from './controllers/ActivityController';

const activityRepository = new MongoActivityRepository();
const activityService = new ActivityService(activityRepository);
const activityController = new ActivityController(activityService);

export {
    activityController
};
