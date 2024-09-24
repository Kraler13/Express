import mongoose from "mongoose";

export interface IPost {
  title: string;
  content: string;
  author: string;
}

export interface IPostDocument extends IPost, Document {
  createdAt: Date;
  updatedAt: Date;
}

const PostModel = new mongoose.Schema(
  {
    title: String,
    content: String,
    author: String,
  },
  { timestamps: true }
);

const Post = mongoose.model<IPostDocument>("Post", PostModel);

export default Post