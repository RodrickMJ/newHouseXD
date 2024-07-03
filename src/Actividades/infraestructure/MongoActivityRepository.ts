import ActivityRepository from "../domain/ActivityRepository";
import ActivityEntry from "../domain/ActivityEntry";
import ActivityModel from "../../Database/models/Actividades";
import { ActivityRequest } from "../domain/DTOS/ActivityRequest";

export default class MongoActivityRepository implements ActivityRepository {
    async logActivity(userName: ActivityRequest, dispositivo: ActivityRequest, action: ActivityRequest): Promise<ActivityEntry | null> {
        try {
            const activity = { userName, dispositivo, action, timestamp: new Date() };
            const createdActivity = new ActivityModel(activity);
            const result = await createdActivity.save();

            const response: ActivityEntry = {
                id: result._id as unknown as string,
                userName: result.userName,
                dispositivo: result.dispositivo,
                action: result.action,
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
                userName: activity.userName,
                dispositivo: activity.dispositivo,
                action: activity.action,
                timestamp: activity.timestamp
            }));
        } catch (error) {
            console.error("Error retrieving activities:", error);
            return [];
        }
    }
}