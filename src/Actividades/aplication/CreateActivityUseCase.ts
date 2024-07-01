import ActivityRepository from "../domain/ActivityRepository";
import ActivityEntry from "../domain/ActivityEntry";
import { ActivityRequest } from "../domain/DTOS/ActivityRequest";

export default class CreateActivityUseCase {
    constructor(readonly entryRepository: ActivityRepository) {}

    async logActivity( userName: ActivityRequest, dispositivo:ActivityRequest, action: ActivityRequest, status:ActivityRequest){
        const activityAdded = await this.entryRepository.logActivity(userName, dispositivo, action, status);

        if(!activityAdded){
            return null
        }

        return activityAdded
    }
}