import express from "express";
import userController from "../controllers/userController";

const router = express.Router();

router.get('/signup', (_req, res)=>{
    res.render('userViews/signUpUser')
});

router.post('/signup', userController.signup);
 
router.get('/login', (_req, res)=>{
    res.render('userViews/loginUser')
});

export default router;
