import jwt from "jsonwebtoken";
import { User } from "../schema/userSchema.js";
async function auth (req,res,next){
try {
        const cookie =req.cookies.accessToken;
    if(cookie){
        const verifyToken = jwt.verify(cookie,process.env.ACCESS_TOKEN_KEY);

        if(!verifyToken){
            throw new Error("user Not Allowed to access resouces")
        }
        
        let tokenUserId = verifyToken.id;

        const existUser = await User.findById(tokenUserId).select("-password");
        if (!existUser) {
            return res.status(401).json({ status: false, msg: 'User not found',result:"" });
          }
      
          req.user = existUser; 
          next(); // 
    }else{
        throw new Error("Please Login First");
    }
} catch (error) {
    res.status(400).json({status:false,msg:error.message,result:""})
    
}

    
}

export {auth}