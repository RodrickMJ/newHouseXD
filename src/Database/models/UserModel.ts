import { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
    nombre: string;
    username: string;
    email: string;
    password: string;
    rol: string | null;
    permissions?: string[];
}

const UserSchema: Schema<IUser> = new Schema({
    nombre: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    rol: { type: String, default: null },
    permissions: { type: [String], default: [] } 
}, {
    timestamps: true
});

const UserModel = model<IUser>('User', UserSchema);

export default UserModel;
