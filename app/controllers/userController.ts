import { Request, Response } from "express";
import User, { IUserDocument } from "../models/UserModel";
import bcrypt from "bcrypt";

export const userController = {
  signup: (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });

    newUser
      .save()
      .then(() => {
        res.redirect("/user/welcome");
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  create: (req: Request, res: Response) => {
    const newUser = new User(req.body)
    newUser.save()
      .then(() => {
        res.redirect('/blog');
      })
      .catch((err) => {
        if (err.code === 11000) {
          res.render('userViews/signupUser', {
            error: true,
            message: "User already exist",
            user: req.body
          })
        }
      });
  },

  login: (req: Request, res: Response) => {
    User.findOne({ email: req.body.email })
      .then((user: IUserDocument | null) => {
        
        if (!user) {
          res.render("userViews/loginUser", {
            error: true,
            message: "That user not exist",
            user: req.body,
          });
          return;
        }
   
        bcrypt.compare(req.body.password, user.password, (err, logged) => {
          if (err) {
            res.render("userViews/loginUser", {
              error: true,
              message: "Login error",
              user: { email: req.body.email, password: "" },
            });
            return;
          }
   
          if (logged) {
            const token = user.generateAuthToken();
            res.cookie("AuthToken", token);
            res.redirect("/blog");
          } else {
            res.render("userViews/loginUser", {
              error: true,
              message: "Login data do not match",
              user: { email: req.body.email, password: "" },
            });
            return;
          }
        });
      })
      .catch((err) => {
        res.send(err);
      });
  },
};

export default userController;
