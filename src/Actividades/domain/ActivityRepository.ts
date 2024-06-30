import ActivityEntry from "./ActivityEntry";

export default interface ActivityRepository {
    logActivity(userId: string, action: string): Promise<ActivityEntry | null>;
    getActivities(): Promise<ActivityEntry[]>;
}
