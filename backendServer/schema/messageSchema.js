import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const messageSchema = new mongoose.Schema({
    carDetails:{
        type:mongoose.Types.ObjectId,
        ref:"Car"
    },
    startdate:{
        type:Date,
        required:true
    },
    enddate:{
        type:Date,
        required:true
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
    bookingStatus:{
        type:String,
        trim:true,
        default:"booked"
    }
    
})

messageSchema.plugin(mongooseAggregatePaginate)


export const Msg = mongoose.model("Msg",messageSchema)