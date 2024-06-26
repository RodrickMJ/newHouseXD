import ActivityService from "./ActivityService";
import nodemailer from 'nodemailer';
import ActivityEntry from "../../domain/ActivityEntry";
import dotenv from 'dotenv';

dotenv.config();

export default class ActivityController {
    constructor(private readonly activityService: ActivityService) { }

    async logActivity(userId: string, action: string) {
        try {
            const activity = await this.activityService.logActivity(userId, action);

            if (activity && activity.userId === '6677f990a804a94f5bbb565a') { 
                await this.logSuspiciousActivity(activity);
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

    async logSuspiciousActivity(activity: ActivityEntry) {
        try {
            const adminEmail = process.env.ADMIN_EMAIL;
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
}
