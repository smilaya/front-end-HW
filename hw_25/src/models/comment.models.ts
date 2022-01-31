import { model, Schema, Document } from "mongoose";

const TOKEN = "Comment";

export interface IComment extends Document {
  body: string;
}
const schema = new Schema<IComment>({
  body: {
    type: String,
    max: 250,
    required: true,
  },
});

export const Comment = model<IComment>(TOKEN, schema);
