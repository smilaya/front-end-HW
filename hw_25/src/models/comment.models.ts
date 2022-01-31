import { model, Schema, Document, Types } from "mongoose";
import { Post } from "./post.models";

const TOKEN = "Comment";

export interface IComment extends Document {
  userId: string;
  body: string;
  post: Types.ObjectId;
}
const schema = new Schema<IComment>({
  userId: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    max: 250,
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: Post,
  },
});

export const Comment = model<IComment>(TOKEN, schema);
