import ActivityEntry from "./ActivityEntry";
import { ActivityRequest } from "./DTOS/ActivityRequest";

export default interface ActivityRepository {
    logActivity(userName: ActivityRequest, dispositivo: ActivityRequest, action: ActivityRequest, status:ActivityRequest) : Promise <ActivityEntry | null>;
    getActivities(): Promise<ActivityEntry[]>;
}
