import mongoose, { Document, Schema } from 'mongoose';
import { IDispositivo } from './Dispositivo';

export interface IActivity extends Document {
    userName: string;
    dispositivo: string;
    action: string;
    timestamp: Date;
}

const activitySchema: Schema<IActivity> = new Schema({
    // userId: { type: String, required: true },
    userName: {type: String, required: true},
    dispositivo: { type: String, required: true },
    action: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const ActivityModel = mongoose.model<IActivity>('Activity', activitySchema);

export default ActivityModel;