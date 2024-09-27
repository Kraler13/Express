import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express, { Request, Response } from "express";

export interface IUser {
  title: string;
  content: string;
  author: string;
}

export interface IUserDocument extends IUser, Document {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  generateAuthToken(): string;
}

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {
  timestamps: true
});

UserSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    })
  })
})

	
UserSchema.methods.generateAuthToken = function (): string {
  const user = this as IUserDocument;
  const token = jwt.sign({ _id: user._id }, "secretKey", { expiresIn: "1h" });
  return token;
};

const User = mongoose.model<IUserDocument>("User", UserSchema);

export default User