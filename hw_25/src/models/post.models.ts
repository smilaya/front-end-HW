import { model, Schema, Document, Types } from "mongoose";
import { Category } from "./category.models";

const TOKEN = "Post";

export interface IPOst extends Document {
  tittle: string;
  body: string;
  userId: string;
  category: Types.ObjectId;
}

const schema = new Schema<IPOst>({
  tittle: {
    type: String,
    max: 60,
    required: true,
  },
  body: {
    type: String,
    max: 250,
  },
  userId: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: Category,
  },
});

export const Post = model<IPOst>(TOKEN, schema);
