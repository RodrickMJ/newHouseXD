import mongoose, { Document, Schema } from 'mongoose';

export interface IDispositivo extends Document {
  name: string;
  status: boolean;
}

const dispositivoSchema: Schema<IDispositivo> = new Schema({
  name: { type: String, required: true, unique: true},
  status: { type: Boolean, default: false },
});

const DispositivoModel = mongoose.model<IDispositivo>('Dispositivo', dispositivoSchema);

export default DispositivoModel;