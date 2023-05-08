import { model, Schema, Document, Model } from "mongoose";

export interface PostType extends Document{
  category: string;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  data: string;
}

const optionsRequired = {
  type: String,
  required: true,
  lowercase: true,
  trim: true,
};

const postSchema = new Schema<PostType, Model<PostType>>({
  category: optionsRequired,
  title: optionsRequired,
  author: {
    name: optionsRequired,
    avatar: optionsRequired,
  },
  data: optionsRequired,
},{
  timestamps: {
    createdAt: true,
    updatedAt: true
  }
});

export default model<PostType>("Posts", postSchema);