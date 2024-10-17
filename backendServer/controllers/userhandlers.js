import { User } from "../schema/userSchema.js";
import jwt from "jsonwebtoken";
import {Msg} from "../schema/messageSchema.js"

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
    throw new Error(error.message);
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

    const userExist = await User.findOne({ $or: [{ email }, { mobile }] });

    if (userExist) {
      let err = userExist.email == email ? "email already used" : "mobile number already used"
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

    res.status(201).json({ status: true, result: newuser, msg: "successfully Added" });
  } catch (error) {
    res.status(400).json({ status: false, result: "", msg: error.message });
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
        // throw new Error("already logged in Logout First to login again")
        return res.status(302).json({ msg: "user already logged in", result: authorizedUser, status: "false" })
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
    const user = await User.findById(userId).select("-password -refreshToken -_id  ");


    res.cookie("accessToken", accessToken, cookieOption)
    res.status(200).json({
      status: true,
      msg: "User Logged In  Successfully",
      result: user,
    });
  } catch (error) {

    res.status(400).json({ status: false, result: "", msg: error.message })
  }
}



function getRentCarhandler(req, res) {
}

function uplodeRentCarhandler(req, res) { }



async function logoutHandler(req, res) {


  try {
    await User.findByIdAndUpdate(req.user._id, {
      $unset: {
        refreshToken: 0,
      },
    });

    let cookieOption = {
      httpOnly: true,
      secure: true,
    };

    res.status(200).
      clearCookie("accessToken", cookieOption)
      .json({ status: true, result: "", msg: "user Successfully Logout" });
  } catch (error) {

    res.status(400).json({ status: false, result: "", msg: error.message })
  }
}

async function getAllUserBookings(req, res) {


  try {
    const userData = await User.aggregate([
      {
        $match: {
          _id: req.user._id
        },
      }, {
        $lookup: {
          from: "msgs",
          localField: "booking",
          foreignField: "_id",
          as: "userBookings",
          pipeline:[
            {
              $lookup: {
                from: "cars",
                localField: "carDetails",
                foreignField: "_id",
                as: "carDetails",
              },
            },
            {
              $addFields: {
                carDetails:{
                  $first: "$carDetails",
                }
              },
            },
          ]
        }
      }
    ])

   res.status(200).json({msg:"success",status:true,result:userData[0].userBookings})



  } catch (error) {
    res.status(400).json({msg:"failed",status:false,result:[]})

  }


}


async function cancelBooking(req,res){



      try {
          const id = req.params.id;

          const msgData = await Msg.findByIdAndUpdate(id,{bookingStatus:"cancelled"},{new:true})

          res.status(201).json({msg:"successfully cancelled",status:false,result:""})

          
      } catch (error) {
        console.log(error);
        
      }
    
  



}



function loginCheck(req, res) {


  if (req.user) {
    res.status(200).json({ msg: "user already logged in", result: req.user, status: true })
  } else {
    res.status(400).json({ msg: "not logged in", result: "", status: false });
  }
}



export {
  registrationHandler,
  loginHandler,
  getRentCarhandler,
  uplodeRentCarhandler,
  logoutHandler,
  loginCheck,
  getAllUserBookings,
  cancelBooking
};
