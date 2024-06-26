import ActivityService from "./ActivityService";
import nodemailer from 'nodemailer';
import ActivityEntry from '../../domain/ActivityEntry';

export default class ActivityController {
    private transporter: nodemailer.Transporter;

    constructor(private readonly activityService: ActivityService) {
        // Configuración del transporte SMTP para Gmail
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER!,
                pass: process.env.EMAIL_PASS!,
            },
        });
    }

    async logActivity(userId: string, action: string) {
        try {
            const activity = await this.activityService.logActivity(userId, action);
            return { success: true, activity };
        } catch (error) {
            console.error('Error logging activity:', error);
            return { success: false, error: 'Error logging activity' };
        }
    }

    async logSuspiciousActivity(userId: string, action: string) {
        try {
            const activity = await this.activityService.logActivity(userId, action);

            // Verificar si activity no es nulo y el usuario es sospechoso
            if (activity && activity.userId === '6677f990a804a94f5bbb565a') {
                const mailOptions: nodemailer.SendMailOptions = {
                    from: `"Admin" <${process.env.EMAIL_USER}>`,
                    to: process.env.ADMIN_EMAIL!,
                    subject: 'Actividad sospechosa detectada',
                    text: `Se ha detectado una actividad sospechosa para el usuario ${activity.userId}.`,
                };

                const info = await this.transporter.sendMail(mailOptions);
                console.log('Correo electrónico enviado:', info);
            }

            return { success: true, activity };
        } catch (error) {
            console.error('Error registrando actividad sospechosa:', error);
            return { success: false, error: 'Error registrando actividad sospechosa' };
        }
    }

    async getActivitiesHistory() {
        try {
            const history = await this.activityService.getActivitiesHistory();
            return { success: true, history };
        } catch (error) {
            console.error('Error obteniendo historial de actividades:', error);
            return { success: false, error: 'Error obteniendo historial de actividades' };
        }
    }
}
