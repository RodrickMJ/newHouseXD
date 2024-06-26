import ActivityService from "./ActivityService";
import UserModel from "../../../Database/models/UserModel";
import nodemailer from 'nodemailer';

const THIEF_USER_ID = '6677f990a804a94f5bbb565a'; 

export default class ActivityController {
    constructor(private readonly activityService: ActivityService) {}

    async logActivity(userId: string, action: string) {
        try {
            const user = await UserModel.findById(userId);
            let isSuspicious = false;

            if (!user) {
                userId = THIEF_USER_ID; 
                isSuspicious = true;
            }

            const activity = await this.activityService.logActivity(userId, action);

            if (isSuspicious) {
                await this.notifyAdmin(activity);
            }

            return { success: true, activity };
        } catch (error) {
            console.error('Error logging activity:', error);
            return { success: false, error: 'Error logging activity' };
        }
    }

    async getActivitiesHistory() {
        try {
            const history = await this.activityService.getActivitiesHistory();
            return { success: true, history };
        } catch (error) {
            console.error('Error fetching activities history:', error);
            return { success: false, error: 'Error fetching activities history' };
        }
    }

    private async notifyAdmin(activity: any) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: 'Actividad sospechosa detectada',
            text: `Se detectó una actividad sospechosa: Usuario ${activity.userId} realizó ${activity.action} a las ${new Date(activity.timestamp).toLocaleString()}`,
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log('Correo de notificación enviado');
        } catch (error) {
            console.error('Error al enviar el correo de notificación:', error);
        }
    }
}
