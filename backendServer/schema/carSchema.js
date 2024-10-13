import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
    trim: true,
    maxlength: [50, "Max 50 characters allowed"],
  },
  model: {
    type: String,
    required: true,
    trim: true,
    maxlength: [50, "Max 50 characters allowed"],
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

export const Car = mongoose.model("Car", carSchema);
