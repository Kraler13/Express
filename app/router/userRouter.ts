import { Request, Response } from "express";
import User from "../models/UserModel";

export const userRouter = {
  signupForm: (_req: Request, res: Response) => {
    res.render("userViews/signup");
  },

  signup: (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });

    newUser.save()
      .then(() => {
        res.redirect("/user/welcome");
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
};

export default userRouter;
