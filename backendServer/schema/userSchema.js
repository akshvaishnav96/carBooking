import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "user name is required"],
    trim: true,
    maxlength: [30, "Max 30 characters allowed"],

  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
    maxlength: [70, "Max 70 characters allowed"],

  },
  mobile: {
    type: String,
    maxlength: [10, "Max mobile number is 10 digits"],
    minlength: [10, "Mobile number must be 10 digits"],
  },
  role:{
    type:String,
    required:true,
    default:"user"
  },
  password: {
    type: String,
    required: true,
    trim: true,
    maxlength: [30, "Max 30 characters allowed"],

  },
  refreshToken:{
    type:String
  }
});

userSchema.pre("save",async function(next){
  if(this.isModified("password")){
   this.password = await bcrypt.hash(this.password,10);
  }
  next();
})


userSchema.methods.isPasswordValid = async function (password) {
  let strPass = password.toString();
  return await bcrypt.compare(strPass,this.password)
};



userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      email: this.email,
      role:this.role,
   
    },
    process.env.ACCESS_TOKEN_KEY,
   {expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRY)
    }


  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.REFRESH_TOKEN_KEY,
    { expiresIn: Number(process.env.REFRESH_TOKEN_EXPIRY) }
  );
};





export const User = mongoose.model("User", userSchema);
