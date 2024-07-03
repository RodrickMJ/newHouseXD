import dotenv from 'dotenv';
import { Response, Request } from 'express';
import LogActivityUseCase from '../../aplication/CreateActivityUseCase';
import DispositivoModel from '../../../Database/models/Dispositivo';
import UserModel from '../../../Database/models/UserModel';

dotenv.config();

export default class CreateActivityController {
    private clients: Response[] = [];

    constructor(readonly LogActivityUseCase: LogActivityUseCase) { }

    async logActivity(req: Request, res: Response) {
        const { userName, dispositivo, action } = req.body;

        try {
            const user = await UserModel.findOne({ userName });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: `Usuario no encontrado '${userName}'`
                });
            }

            let dispositivoExistente = await DispositivoModel.findOne({ name: dispositivo });
            if (!dispositivoExistente) {
                return res.status(404).json({
                    success: false,
                    msg: `No se encontró un dispositivo con el nombre '${dispositivo}'`
                });
            }

            if (action === 'toggle') {
                dispositivoExistente.status = !dispositivoExistente.status;
                await dispositivoExistente.save();
                dispositivoExistente = await DispositivoModel.findOne({ name: dispositivo });
            } else {
                return res.status(400).json({ message: `Acción inválida '${action}'` });
            }

            if (!dispositivoExistente) {
                throw new Error(`No se pudo recuperar el dispositivo '${dispositivo}' actualizado`);
            }

            const activity = await this.LogActivityUseCase.logActivity(userName, dispositivo, action);
            console.log(activity);

            this.sendEvent('activity', { activity, dispositivo: { name: dispositivoExistente.name, status: dispositivoExistente.status } });

            return res.status(201).json({
                success: true,
                data: {
                    activity,
                    dispositivo: {
                        name: dispositivoExistente.name,
                        status: dispositivoExistente.status
                    }
                },
                msg: "Actividad creada con éxito"
            });
        } catch (error) {
            console.error(error);
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';        
            return res.status(500).json({
                success: false,
                message: 'Error del servidor',
                error: errorMessage
            });
        }
    }

    async addClient(req: Request, res: Response) {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });

        this.clients.push(res);

        req.on('close', () => {
            this.clients = this.clients.filter(client => client !== res);
        });
    }

    private sendEvent(eventType: string, data: any) {
        const eventString = `event: ${eventType}\ndata: ${JSON.stringify(data)}\n\n`;
        console.log("Sending event:", eventType, data); 
        this.clients.forEach(client => {
            client.write(eventString);
        });
    }
}
