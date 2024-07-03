import { Router } from 'express';
import { createActivityController,GetActivityesHistory } from './dependencies';

const activityRouter = Router();

activityRouter.post('/action', createActivityController.logActivity.bind(createActivityController));

activityRouter.get('/history', GetActivityesHistory.ActivitiesHistory.bind(GetActivityesHistory));

activityRouter.get('/events', createActivityController.addClient.bind(createActivityController));

export default activityRouter;