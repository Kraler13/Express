import express, { Express, Request, Response } from "express";
import { IPost } from "../models/PostModel";
const Post = require('./app/models/PostModel')

module.exports = {
    index: (req: Request, res: Response) => {
      Post.find({})
        .lean()
        .then((posts: IPost) => {
          res.render("blogViews/blog", { posts: posts });
        })
        .catch((err: unknown) => {
          res.send(err);
        });
    },
  };

  