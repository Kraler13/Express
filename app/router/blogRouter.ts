import express, { Express, Request, Response } from "express";
import { postController } from "../controllers/postController";
import { IPost } from "../models/PostModel";
const Post = require('../models/PostModel')

const router = express.Router();

router.get("/", postController.index);
router.get("/add", (_req: Request, res: Response) => {
  res.render("blogViews/addPost");
});
router.post("/add", postController.create);
router.get("/:id/edit", postController.editForm);
router.post("/:id/edit", postController.update);
router.get("/:id", postController.post);
router.get("/delete/:id", postController.delete);
router.get("/mongoose/:id", function (req: Request, res: Response) {
  Post.findById(req.params.id).then((post: IPost)=>{
    res.render("home", {
      title: post.title,
      content: post.content,
      displayTitle: true,
      names: ["Adam", "Ola", "Kasia", "Tomek"],
    });
  }).catch((err: unknown)=>{
    res.send(err)
  })
   
});

export default router