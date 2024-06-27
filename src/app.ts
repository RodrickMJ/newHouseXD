import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import connectToDatabase from './Database/database';
import userRouter from './Users/infrastructure/UserRouter';
import activityRouter from './PuertaPrincipal/infraestructure/ActivityRouter';
import verifyToken from './Users/infrastructure/middleware/VerifyToken';
import AuthController from './Users/infrastructure/controllers/AuthController';
import { authService, authenticateUser } from './Users/infrastructure/dependencies';
import { activityController } from './PuertaPrincipal/infraestructure/dependencies';
import eventSource from './EventSource';  // Importa la clase EventSource

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

app.use(express.json());
app.use(cors());

const APP_PORT = process.env.SERVER_PORT || 3000;

connectToDatabase();

app.use('/auth', AuthController(authenticateUser, authService));
app.use('/users', verifyToken(authService));
app.use('/users', userRouter);

app.use('/activities', activityRouter(io, activityController));

// Añade un nuevo endpoint para conexiones SSE
app.get('/events', (req, res) => {
  eventSource.addClient(req, res);
});

server.listen(APP_PORT, () => {
  console.clear();
  console.log(`Server running at http://localhost:${APP_PORT}`);
});
