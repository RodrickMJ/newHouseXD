import { Router, Request, Response } from 'express';
import AuthenticateUser from '../../aplication/AuthenticateUser';
import AuthService from '../../aplication/Services/AuthService';

const router = Router();

export default (authenticateUser: AuthenticateUser, authService: AuthService) => {
  router.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
      const token = await authenticateUser.run(username, password);
      res.json({ token });
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(401).send(err.message);
      } else {
        res.status(500).send('Error desconocido');
      }
    }
  });

  return router;
};
