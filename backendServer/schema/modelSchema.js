import mongoose from "mongoose";

const modelSchema = new mongoose.Schema({
    model:{
        type:String,
        required:true,
        trim:true,
        maxlength: [30, "Max 30 characters allowed"],
    },
    brand:{
        type:String,
        required:true,
        trim:true,
        maxlength: [30, "Max 30 characters allowed"],

    }
},{timestamps:true})

export const Model = mongoose.model("Model",modelSchema)