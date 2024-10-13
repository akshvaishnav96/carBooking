import { Router } from "express";
import {  getRentCarhandler, getSingleCar, loginHandler, registrationHandler, uplodeRentCarhandler } from "../controllers/userhandlers.js";
import { auth } from "../middlewares/auth.js";


const userRouter =  Router();

//get routes ///////////////////////////////

userRouter.route("/rentCar").get(getRentCarhandler);
userRouter.route("/cars/:id").get(getSingleCar)

//post routes //////////////////////////////////////
userRouter.route("/register").post(registrationHandler);
userRouter.route("/login").post(loginHandler);
userRouter.route("/rentCar").post(uplodeRentCarhandler);



export {userRouter}



