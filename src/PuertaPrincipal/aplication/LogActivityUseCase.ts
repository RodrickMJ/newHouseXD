import ActivityRepository from "../domain/ActivityRepository";
import ActivityEntry from "../domain/ActivityEntry";

export default class LogActivityUseCase {
    constructor(readonly repository: ActivityRepository) {}

    async logActivity(userId: string, action: string): Promise<ActivityEntry | null> {
        return this.repository.logActivity(userId, action);
    }
}
