import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const modelSchema = new mongoose.Schema(
  {
    model: {
      type: String,
      required: true,
      trim: true,
      maxlength: [50, "Max 50 characters allowed"],
      lowercase: true
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
  },
  { timestamps: true }
);


modelSchema.plugin(mongooseAggregatePaginate)
export const Model = mongoose.model("Model", modelSchema);
