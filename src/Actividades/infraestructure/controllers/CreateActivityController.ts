import dotenv from 'dotenv';
import { Response, Request } from 'express';
import LogActivityUseCase from '../../aplication/CreateActivityUseCase';

dotenv.config();

export default class CreateActivityController {
    private clients: Response[] = [];

    constructor(readonly LogActivityUseCase: LogActivityUseCase) { }

    async logActivity(req: Request, res: Response) {
        const { userName, dispositivo, action, status } = req.body;

        // const result: ActivityRequest = {userName, dispositivo, action, status};

        const activity = await this.LogActivityUseCase.logActivity(userName, dispositivo, action, status);

        this.sendEvent('activity', activity);

        if (!activity) {
            return res.status(500).json({
                data: activity,
                msg: "error al realizar la actividad"
            });
        }

        return res.status(201).json({
            success: true,
            data: activity,
            msg: "actividad creada con exito"
        });
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
        this.clients.forEach(client => {
            client.write(eventString);
        });
    }
}
