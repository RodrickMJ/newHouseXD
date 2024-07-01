import mongoose, { Document, Schema } from 'mongoose';

export interface IActivity extends Document {
    // userId: string;
    userName: string;
    dispositivo:string;
    action: string;
    status:boolean;
    timestamp: Date;
}

const activitySchema: Schema<IActivity> = new Schema({
    // userId: { type: String, required: true },
    userName: {type: String, required: true},
    dispositivo: {type: String, required: true},
    action: { type: String, required: true },
    status: {type: Boolean, requiere: true},
    timestamp: { type: Date, default: Date.now }
});

const ActivityModel = mongoose.model<IActivity>('Activity', activitySchema);

export default ActivityModel;
