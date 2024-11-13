import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  organization: string;
  location?: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  organization: { type: String, required: true },
  location: { type: String },
});

export default mongoose.model<IUser>('User', UserSchema);