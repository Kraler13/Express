import { Request, Response } from "express";
import Post, { IPostDocument } from "../models/PostModel";

export const postController = {
  index: (_req: Request, res: Response) => {
    Post.find({})
      .lean()
      .then((posts) => {
        res.render("blogViews/blog", { posts: posts });
      })
      .catch((err: unknown) => {
        res.send(err);
      });
  },
  post: (req: Request, res: Response) => {
    Post.findById(req.params.id)
      .lean()
      .then((post) => {
        if (!post) {
          res.status(404).send("Post not found");
          return;
        }
        res.render("blogViews/singlePost", { post });
      })
      .catch((err) => {
        res.send(err);
      });
  },
  editForm: (req: Request, res: Response) => {
    Post.findById(req.params.id)
      .then((post) => {
        res.render("blogViews/editPost", {post});
      })
      .catch((err) => {
        res.send(err);
      });
  },
  update: (req: Request, res: Response) => {
    Post.findByIdAndUpdate(req.params.id, req.body)
      .then((post) => {
        if (!post) {
          res.status(404).send("Post not found");
          return;
        }
        res.redirect("/blog/" + post._id);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  delete: (req: Request, res: Response) => {
    Post.findByIdAndDelete(req.params.id)
      .then(() => {
        res.redirect("/blog");
      })
      .catch((err) => {
        res.send(err);
      });
  },
  create: (req: Request, res: Response) => {
    const newPost = new Post({ ...req.body, author: "Filip" });
    newPost.save();
   
    res.redirect('/blog');
  }
};
