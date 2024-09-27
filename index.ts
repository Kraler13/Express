import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/express-blog");
const Post = require('./app/models/PostModel')
const hbs = require('express-handlebars');
import blogRouter from './app/router/blogRouter';
import userRouter from './app/router/userRouter';
dotenv.config();

const app = express();
const port = 8080;
app.engine("hbs", hbs.engine({ extname: ".hbs"}));
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

type Example = {
  id: string;
}



app.use('/files', express.static('public'))

app.get('/', (req: Request<Example>, res: Response) => {
  res.render("home", {title: 'my app',
     content: 'lorem ipsum', 
     showTitle: true,
     names: ['Ola', 'Adam', 'Michał']});
});

app.use("/blog", blogRouter)
app.use("/user", userRouter)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});