import mongoose from "mongoose";

export interface IUser {
  title: string;
  content: string;
  author: string;
}

export interface IUserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
}

const LogedUser = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  }, {
      timestamps: true
  });

const User = mongoose.model<IUserDocument>("LogedUser", LogedUser);

export default User