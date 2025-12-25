import { Router } from "express";
import { register, login } from "../controller/authController.js";

const router = Router();

router.post('/register',register);
router.post('/login',login);
router.get('/logout',(req,res)=>{
    res.clearCookie('token');
    res.status(200).json({message:"logged out successfully"});
});

export default router;