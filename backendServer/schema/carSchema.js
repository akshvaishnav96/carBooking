import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
    trim: true,
    maxlength: [30, "Max 30 characters allowed"],
  },
  model: {
    type: String,
    required: true,
    trim: true,
    maxlength: [30, "Max 30 characters allowed"],
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
    maxlength: [500, "Max 500 character allowed"],
    required: true,
  },
  images: [{
    type: String,
    trim: true,
}],
});

export const Car = mongoose.model("Car", carSchema);
