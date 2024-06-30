import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { Response, Request } from 'express';
import LogActivityUseCase from "../../aplication/LogActivityUseCase";
import ActivityEntry from "../../domain/ActivityEntry";

dotenv.config();

export default class ActivityController {
    private clients: Response[] = [];

    constructor(private readonly logActivityUseCase: LogActivityUseCase) {}

    async logActivity(req: Request, res: Response) {
        try {
            const { userId, action } = req.body as { userId: string; action: string };
            const activity = await this.logActivityUseCase.logActivity(userId, action);

            if (activity && activity.userId === '6677f990a804a94f5bbb565a') {
                await this.logSuspiciousActivity(activity);
            }

            this.sendEvent('activity', activity);

            res.json({ success: true, activity });
        } catch (error) {
            console.error('Error logging activity:', error);
            res.status(500).json({ success: false, error: 'Error logging activity' });
        }
    }

    async getActivitiesHistory(req: Request, res: Response) {
        try {
            const activities = await this.logActivityUseCase.getActivitiesHistory();
            res.json({ success: true, activities });
        } catch (error) {
            console.error('Error fetching activities history:', error);
            res.status(500).json({ success: false, error: 'Error fetching activities history' });
        }
    }

    async logSuspiciousActivity(activity: ActivityEntry) {
        try {
            const adminEmail = process.env.ADMIN_EMAIL;
            if (!adminEmail) {
                throw new Error('Admin email is not set in the environment variables.');
            }

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_PASS
                }
            });

            const mailOptions = {
                from: process.env.GMAIL_USER,
                to: adminEmail,
                subject: 'Actividad sospechosa detectada',
                text: `Se ha detectado una actividad sospechosa: 
                Usuario: ${activity.userId}
                Acción: ${activity.action}
                Timestamp: ${new Date(activity.timestamp ?? new Date()).toLocaleString()}`
            };

            await transporter.sendMail(mailOptions);
            console.log('Correo enviado al administrador por actividad sospechosa.');
        } catch (error) {
            console.error('Error logging suspicious activity:', error);
        }
    }

    addClient(req: Request, res: Response) {
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
