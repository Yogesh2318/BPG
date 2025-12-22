import { Schema } from "mongoose";
import mongoose from "mongoose";
import Plant from "./plantModel.js";

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    fullName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    plant:{
        type:Plant.schema,
        default:[],
    },
    timestamp:{
        type:Date,
        default:Date.now,
    },
    friends:{
        type:[String],
        default:[],
    },
    requests:{
        type:[String],
        default:[],
    },
});

const User = mongoose.model('User',userSchema);
export default User;
