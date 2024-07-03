import dotenv from 'dotenv';
import express, { Application } from 'express';
import cors from 'cors';
import connectToDatabase from './Database/database';
import userRouter from './Users/infrastructure/UserRouter';
import activityRouter from './Actividades/infraestructure/ActivityRouter';
import verifyToken from './Users/infrastructure/middleware/VerifyToken';
import AuthController from './Users/infrastructure/controllers/AuthController';
import { authService, authenticateUser } from './Users/infrastructure/dependencies';
import dispositivoRouter from './Dispositivos/infraestructure/DispositivoRouter'; 
// import { Server } from 'socket.io';
// import http from 'http';

dotenv.config();

const app: Application = express();
// const server: http.Server = http.createServer(app);
// const io: Server = new Server(server, {
//   cors: {
//     origin: '*',
//   }
// });

app.use(express.json());
app.use(cors());

const PORT: number | string = process.env.SERVER_PORT || 3000;

connectToDatabase();

app.use('/auth', AuthController(authenticateUser, authService));
app.use('/users', verifyToken(authService), userRouter);
app.use('/activities', activityRouter);
app.use('/dispositivos', dispositivoRouter);

app.listen(PORT, () => {
  console.clear();
  console.log(`Server ejecutándose en http://localhost:${PORT}`);
});
