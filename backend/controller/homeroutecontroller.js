import user from "../models/userModel.js";
const getinfo=async(req,res)=>{
    try {
        const userid=req.userId;
        const userdata=await user.findById(userid).select('-password -__v -createdAt -updatedAt');
        res.status(200).json(userdata);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }   
};

export {getinfo};