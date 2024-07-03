import ActivityRepository from "../domain/ActivityRepository";
import ActivityEntry from "../domain/ActivityEntry";

export default class getActivitiesHistory {
    constructor(readonly repository: ActivityRepository) {}
    async ActivitiesHistory(): Promise<ActivityEntry[]> {
        const respActivitie = await this.repository.getActivities();
        
        if(respActivitie === null){
            return [];
        }
    
        return respActivitie;
    }
}