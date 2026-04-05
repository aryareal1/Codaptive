import { Schema, model, Document } from "mongoose";

export interface IModule extends Document {
  name: string;
  description: string;
  order: number;
  thumbnail?: string;
}

const moduleSchema = new Schema<IModule>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    order: { type: Number, default: 0 },
    thumbnail: { type: String },
  },
  { timestamps: true },
);

export default model<IModule>("Module", moduleSchema);
