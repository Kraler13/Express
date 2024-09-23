import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { title } from "process";
import { IPost } from "./app/models/PostModel";
import { postController } from "./app/controllers/postController";
	
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/express-blog");
const Post = require('./app/models/PostModel')
const hbs = require('express-handlebars');

dotenv.config();

const app = express();
const port = 8080;
app.engine("hbs", hbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

type Example = {
  id: string;
}

app.get("/blog", postController.index)


app.get("/mongoose/:id", function (req: Request<Example>, res: Response) {
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

app.use('/files', express.static('public'))

app.get('/', (req: Request<Example>, res: Response) => {
  res.render("home", {title: 'my app',
     content: 'lorem ipsum', 
     showTitle: true,
     names: ['Ola', 'Adam', 'Michał']});
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});