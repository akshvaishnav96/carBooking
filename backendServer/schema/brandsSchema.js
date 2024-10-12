import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    brand:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        maxlength: [30, "Max 30 characters allowed"],

    },
},{timestamps:true})

export const Brand = mongoose.model("Brand",brandSchema)