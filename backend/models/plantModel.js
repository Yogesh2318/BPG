import { Schema } from "mongoose";
import mongoose from "mongoose";

const plantSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    waterequirement:{
        type:String,
        required:false,
    },
    sunlightrequirement:{   
        type:String,
        required:false,
    },
    fertilization:{
        type:String,
        required:false,
    },
    pestcontrol:{
        type:String,
        required:false,
    },
    currentHealthStatus:{
        type:String,
        required:false,
    },
    lastWateredDate:{
        type:Date,
        required:false,
    },
    lastFertilizedDate:{
        type:Date,
        required:false,
    },
    notes:{
        type:String,
        required:false,
    },
});
const Plant = mongoose.model('Plant',plantSchema);
export default Plant;