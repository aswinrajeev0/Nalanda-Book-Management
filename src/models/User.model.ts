import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/models/usermodel.interface';

const UserSchema: Schema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;