import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    carnumber:{
        type:String,
        required:true
    } ,
    brand:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },startdate:{
        type:Date,
        required:true
    },
    enddate:{
        type:Date,
        required:true
    },
    image:{
        type:String,
    },
    carId:{
        type:mongoose.Types.ObjectId,
        ref:"Car"
    }  
})

export const Msg = mongoose.model("Msg",messageSchema)