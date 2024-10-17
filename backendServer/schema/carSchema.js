import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const carSchema = new mongoose.Schema({
  brand: {
      type:mongoose.Types.ObjectId,
      ref:"Brand",
      required:true
  },
  model: {
    type:mongoose.Types.ObjectId,
    ref:"Model",
    required:true
  },
  carnumber: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    maxlength: [20, "Max 20 characters allowed"],
    minlength: [4, "minimum 4 characters allowed"],
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  booked: {
    type: Boolean,
    default: false,
  },
  images: [
    {
      type: String,
      trim: true,
    },
  ],
  startdate:{
    type:Date,
  },
  enddate:{
    type:Date,
  }
});


carSchema.plugin(mongooseAggregatePaginate)
export const Car = mongoose.model("Car", carSchema);
