import mongoose, { Document, Schema } from 'mongoose';

export interface IMissile extends Document {
  name: string;
  description: string;
  speed: number;
  intercepts?: string[];
  price: number;
}

const MissileSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  speed: Number,
  intercepts: [String],
  price: Number,
});

export default mongoose.model<IMissile>('Missile', MissileSchema);
