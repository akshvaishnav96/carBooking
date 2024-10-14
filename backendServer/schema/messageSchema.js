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
    },
    name:{
        type:String,
        required:true,
        trim:true,
        max:[50,"max 50 chracters allowed"]
    }, 
    email:{
        type:String,
        required:true,
        trim:true,
        max:[50,"max 50 chracters allowed"]
    }, 
    mobile:{
        type:String,
        required:true,
        trim:true,
        max:[50,"max 50 chracters allowed"]
    },
    address:{
        type:String,
        required:true,
        trim:true,
    },
    
})

export const Msg = mongoose.model("Msg",messageSchema)