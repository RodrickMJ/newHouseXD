import mongoose, { Document, Schema } from 'mongoose';

export interface Device extends Document {
    nombre: string;
    status: boolean;
}

const deviceSchema: Schema<Device> = new Schema({
    nombre: { type: String, required: true },
    status: { type: Boolean, required: true }
});

const DeviceModel = mongoose.model<Device>('Device', deviceSchema);

export default DeviceModel;