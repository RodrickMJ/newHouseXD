import dotenv from 'dotenv';
import express, { Application, Request, Response, NextFunction } from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import connectToDatabase from './Database/database';
import userRouter from './Users/infrastructure/UserRouter';
import activityRouter from './Actividades/infraestructure/ActivityRouter';
import verifyToken from './Users/infrastructure/middleware/VerifyToken';
import AuthController from './Users/infrastructure/controllers/AuthController';
import { authService, authenticateUser } from './Users/infrastructure/dependencies';

dotenv.config();

const app: Application = express();
const server: http.Server = http.createServer(app);
const io: Server = new Server(server, {
  cors: {
    origin: '*',
  }
});

app.use(express.json());
app.use(cors());

const PORT: number | string = process.env.SERVER_PORT || 3000;

connectToDatabase()

const authController = AuthController(authenticateUser, authService);

app.use('/auth', authController);
app.use('/users', verifyToken(authService), userRouter);
app.use('/activities', activityRouter(io));

server.listen(PORT, () => {
  console.clear();
  console.log(`Server ejecutanose en http://localhost:${PORT}`);
});
