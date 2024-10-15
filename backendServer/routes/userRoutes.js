import { Router } from "express";
import {  getRentCarhandler, logoutHandler, loginHandler, registrationHandler, uplodeRentCarhandler, loginCheck } from "../controllers/userhandlers.js";
import { auth } from "../middlewares/auth.js";


const userRouter =  Router();

//get routes ///////////////////////////////

userRouter.route("/rentCar").get(getRentCarhandler);

//post routes //////////////////////////////////////
userRouter.route("/register").post(registrationHandler);
userRouter.route("/login").post(loginHandler);
userRouter.route("/logout").post(auth,logoutHandler);
userRouter.route("/rentCar").post(uplodeRentCarhandler);
userRouter.route("/logincheck").get(loginCheck)



export {userRouter}



