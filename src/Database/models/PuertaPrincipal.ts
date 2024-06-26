import mongoose, { Document, Schema } from 'mongoose';

export interface IActivity extends Document {
    userId: string;
    action: string;
    timestamp: Date;
}

const activitySchema: Schema<IActivity> = new Schema({
    userId: { type: String, required: true },
    action: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const ActivityModel = mongoose.model<IActivity>('Activity', activitySchema);

export default ActivityModel;
