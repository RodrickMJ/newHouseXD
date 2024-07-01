import { Request, Response } from "express";
import getActivitiesHistory from "../../aplication/GetActivitiesHistory";

export default class GetActivityController {
    constructor (readonly useCase: getActivitiesHistory){}

    async ActivitiesHistory(req: Request, res: Response) {
        try {
            const activities = await this.useCase.ActivitiesHistory();
            res.json({ success: true, activities });
        } catch (error) {
            console.error('Error fetching activities history:', error);
            res.status(500).json({ success: false, error: 'Error fetching activities history' });
        }
    }
}