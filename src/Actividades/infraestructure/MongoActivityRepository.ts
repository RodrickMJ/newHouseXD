import ActivityRepository from "../domain/ActivityRepository";
import ActivityEntry from "../domain/ActivityEntry";
import ActivityModel from "../../Database/models/Actividades";

export default class MongoActivityRepository implements ActivityRepository {
    async logActivity(userId: string, action: string): Promise<ActivityEntry | null> {
        try {
            const activity = { userId, action, timestamp: new Date() };
            const createdActivity = new ActivityModel(activity);
            const result = await createdActivity.save();

            const response: ActivityEntry = {
                id: result._id as unknown as string,
                action: result.action,
                userId: result.userId,
                timestamp: result.timestamp
            };

            return response;
        } catch (error) {
            console.error("Error logging activity:", error);
            return null;
        }
    }

    async getActivities(): Promise<ActivityEntry[]> {
        try {
            const activities = await ActivityModel.find().exec();
            return activities.map(activity => ({
                 id: activity._id as unknown as string,
                action: activity.action,
                userId: activity.userId,
                timestamp: activity.timestamp
            }));
        } catch (error) {
            console.error("Error retrieving activities:", error);
            return [];
        }
    }
}
