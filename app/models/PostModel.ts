import mongoose from 'mongoose';
 
export interface IPost {
  title: string;
  content: string;
  author: string;
}

const Post = new mongoose.Schema(
  {
    title: String,
    content: String,
    author: String,
  },
  { timestamps: true }
);
 
module.exports = mongoose.model<IPost>('Post', Post)