import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generatetoken.js";

 export const register = async (req,res)=>{
  try {
   const { fullName, username, password, confirmPassword} = req.body;
   if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
  }
  const existingUser = await User.findOne({ username });
  if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
  }
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password,salt);
  const newUser = new User({
   fullName,
   username,
   password:hashedPassword,
 
});
if(newUser){
    generateTokenAndSetCookie(newUser._id,res);
   await newUser.save();
 
   res.status(201).json({
     _id: newUser._id,
     fullName: newUser.fullName,
     username: newUser.username,
  });
}else{
   res.status(400).json({error:"Invalid user data"});
}

  } catch (error) {
   console.log("Error in signup controller:", error.message);
   res.status(500).json({ error: "Internal server error" });
  }
 }


export const login = async (req,res)=>{
      try {
         const { username, password } = req.body;
         const user = await User.findOne({ username });
         if(user && user.length > 0){
            const isPasswordMatch = await bcrypt.compare(password,user[0].password);
            if(isPasswordMatch){
               generateTokenAndSetCookie(user[0]._id,res);
               res.status(200).json({
                  _id: user[0]._id,
                  fullName: user[0].fullName,
                  username: user[0].username,
               });
            }else{
               res.status(400).json({error:"Invalid password"});
            }
         }else{
            res.status(400).json({error:"Invalid username"});
         }
      } catch (error) {
         console.log("Error in login controller:", error.message);
         res.status(500).json({ error: "Internal server error" });
      }
   }