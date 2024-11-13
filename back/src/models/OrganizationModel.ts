
// src/models/Organization.ts
import mongoose, { Document, Schema } from 'mongoose';

interface Resource {
  name: string;
  amount: number;
}

export interface IOrganization extends Document {
  name: string;
  resources: Resource[];
  budget: number;
}

const OrganizationSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  resources: [
    {
      name: String,
      amount: Number,
    },
  ],
  budget: { type: Number, default: 0 },
});

export default mongoose.model<IOrganization>('Organization', OrganizationSchema);
