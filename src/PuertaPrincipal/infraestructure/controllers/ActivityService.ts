import ActivityRepository from "../../domain/ActivityRepository";
import ActivityEntry from "../../domain/ActivityEntry";
import UserModel from "../../../Database/models/UserModel";

export default class ActivityService {
    constructor(private readonly repository: ActivityRepository) {}

    async logActivity(userId: string, action: string): Promise<ActivityEntry | null> {
       
        const user = await UserModel.findById(userId);
        if (!user) {
           
            const suspiciousActivity: ActivityEntry = {
                userId,
                action,
                timestamp: new Date()
            };
            await this.repository.logActivity(userId, action); 
            return suspiciousActivity;
        }

        
        return this.repository.logActivity(userId, action);
    }

    async getActivitiesHistory(): Promise<ActivityEntry[]> {
        return this.repository.getActivities();
    }
}
