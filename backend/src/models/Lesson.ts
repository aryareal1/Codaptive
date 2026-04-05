import { Schema, model, Document, Types } from "mongoose";

export interface ILesson extends Document {
  moduleId: Types.ObjectId;
  title: string;
  content: string;
  order: number;
  xpReward: number;
}

const lessonSchema = new Schema<ILesson>(
  {
    moduleId: { type: Schema.Types.ObjectId, ref: "Module", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    order: { type: Number, default: 0 },
    xpReward: { type: Number, default: 50 },
  },
  { timestamps: true },
);

export default model<ILesson>("Lesson", lessonSchema);
