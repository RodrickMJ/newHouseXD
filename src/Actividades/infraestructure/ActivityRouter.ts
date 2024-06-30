import { Router } from 'express';
import { Server } from 'socket.io';
import {activityController,logActivityUseCase} from './dependencies';

const activityRouter = (io: Server): Router => {
    const router = Router();

    router.post('/action', async (req, res) => {
        await activityController.logActivity(req, res);
    });

    router.post('/suspicious', async (req, res) => {
        await activityController.logSuspiciousActivity(req.body);
        res.json({ success: true });
    });

    router.get('/history', async (req, res) => {
        await activityController.getActivitiesHistory(req, res);
    });

    router.get('/events', (req, res) => {
        activityController.addClient(req, res);
    });

    return router;
};

export default activityRouter;
