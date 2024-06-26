import express from 'express';
import { createUserController, byIdUserController } from './dependencies';

const router = express.Router();

router.post('/', createUserController.run.bind(createUserController));
router.get('/:id', byIdUserController.run.bind(byIdUserController));

export default router;
