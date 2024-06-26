import ActivityRepository from "../../domain/ActivityRepository";
import ActivityEntry from "../../domain/ActivityEntry";

export default class ActivityService {
    constructor(private readonly repository: ActivityRepository) {}

    async logActivity(userId: string, action: string): Promise<ActivityEntry | null> {
        return this.repository.logActivity(userId, action);
    }

    async getActivitiesHistory(): Promise<ActivityEntry[]> {
        return this.repository.getActivities();
    }
}
