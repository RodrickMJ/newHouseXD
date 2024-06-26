import { Router } from 'express';
import { Server } from 'socket.io';
import ActivityController from './controllers/ActivityController';

const activityRouter = (io: Server, activityController: ActivityController): Router => {
    const router = Router();

    router.post('/action', async (req, res) => {
        const { userId, action } = req.body;
        const result = await activityController.logActivity(userId, action);
        if (result.success) {
            io.emit('activity', result.activity);
        }
        res.json(result);
    });

    router.post('/suspicious', async (req, res) => {
        const { userId, action } = req.body; // Asegúrate de recibir userId y action del cuerpo de la solicitud
        const result = await activityController.logSuspiciousActivity(userId, action); // Pasar userId y action a logSuspiciousActivity
        if (result.success) {
            res.json({ success: true });
        } else {
            res.status(500).json({ success: false, error: 'Error registrando actividad sospechosa' });
        }
    });

    router.get('/history', async (req, res) => {
        const result = await activityController.getActivitiesHistory();
        res.json(result);
    });

    return router;
};

export default activityRouter;
