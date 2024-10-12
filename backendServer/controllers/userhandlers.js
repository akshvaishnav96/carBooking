import { User } from "../schema/userSchema.js";
import jwt from "jsonwebtoken";

const generateAccessTokenAndRefreshToken = async function (userID) {
  try {
    const user = await User.findById(userID);

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;

    const updateUser = await user.save();

    const userId = updateUser._id;
    return { accessToken, refreshToken, userId };
  } catch (error) {
    throw new ApiErrors(401, "cookies not set something went wrong", error);
  }
};

async function registrationHandler(req, res) {
  try {
    const { email, username, mobile, password } = req.body;

    const requiredFields = ["username", "email", "password", "mobile"];

    requiredFields.filter((item) => {
      if (!req.body[item]) {
        throw new Error(`Field ${item} is required.`);
      }
    });

    const userExist = await User.findOne({$or:[{email},{mobile}]});
    
    if (userExist) {
        let err =  userExist.email == email ? "email already used" : "mobile number already used"
      throw new Error(err);
    }

    const user = await User.create({
      username,
      email,
      mobile,
      password,
    });

    const newuser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    res.status(201).json({status:true,result:newuser,msg:"successfully Added"});
  } catch (error) {
    res.status(400).json({ status: false,result:"", msg: error.message });
  }
}

async function loginHandler(req, res) {
try {
    const alreadyAccessToken = await req.cookies.accessToken;
    if (alreadyAccessToken) {
      const jwtverify = jwt.verify(
        alreadyAccessToken,
        process.env.ACCESS_TOKEN_KEY
      );
      const _id = jwtverify.id;
      const authorizedUser = await User.findById({ _id }).select("-password -refreshToken");
  
      if (authorizedUser) {
        throw new Error("already logged in Logout First to login again")
      }
    }
  
    const { email, password } = req.body;
    if (!email) {
      throw new Error("Please enter username or email to login");
    }
  
    const existUser = await User.findOne({ email: email });
  
    if (!existUser) {
      throw new Error("user Not Exist please Enter Valid Details");
    }
  
    if (!password) {
      throw new Error("password is required");
    }
  
    const verifyUser = await existUser.isPasswordValid(password);  
    if (!verifyUser) {
      throw new Error("user Details Not Matched");
    }
  
    const { accessToken, refreshToken, userId } =
      await generateAccessTokenAndRefreshToken(existUser._id);
    let cookieOption = {
      httpOnly: true,
      secure: true,
      expires: new Date(
        Date.now() + Number(process.env.COOKIE_EXPIRY_FROM_BROWSER)
      ),
    };
    const user = await User.findById(userId).select("-password -refreshToken ");
    res
      .status(200)
      .cookie("accessToken", accessToken, cookieOption)
      .json({
        status: true,
        msg: "User Logged In  Successfully",
        result: user,
      });
} catch (error) {
  res.status(400).json({status:false,result:"",msg:error.message})
}
}



function getRentCarhandler(req, res) {}

function uplodeRentCarhandler(req, res) {}

function getSingleCar(req, res) {}

function getCarsAccordingToBrands(req, res) {}

function getCarsAccordingToModels() {}

function fetchAllCarsHandler() {}

export {
  registrationHandler,
  loginHandler,

  getRentCarhandler,
  uplodeRentCarhandler,
  getSingleCar,
  getCarsAccordingToBrands,
  getCarsAccordingToModels,
  fetchAllCarsHandler,
};
