// import { Router } from "express";
// import {  getRentCarhandler, logoutHandler, loginHandler, registrationHandler, uplodeRentCarhandler, loginCheck, getAllUserBookings, cancelBooking } from "../controllers/userhandlers.js";
// import {  getAllBrands,getAllModels,getuplodedCars,getSingleCars, updateCarHandler, fetchSingleUser} from "../controllers/adminHandle.js";
// import { auth } from "../middlewares/auth.js";


// const userRouter =  Router();

// //get routes ///////////////////////////////

// userRouter.route("/rentCar").get(getRentCarhandler);
// userRouter.route("/cars/brand").get(getAllBrands);
// userRouter.route("/cars/model").get(getAllModels);
// userRouter.route("/cars").get(getuplodedCars);
// userRouter.route("/cars/:id").get(auth,getSingleCars);
// userRouter.route("/user/:id").get(auth,fetchSingleUser);
// userRouter.route("/booking").get(auth,getAllUserBookings)

// //post routes //////////////////////////////////////
// userRouter.route("/register").post(registrationHandler);
// userRouter.route("/login").post(loginHandler);
// userRouter.route("/logout").post(auth,logoutHandler);
// userRouter.route("/rentCar").post(uplodeRentCarhandler);
// userRouter.route("/logincheck").get(auth,loginCheck)
// userRouter.route("/cars/:id").patch(auth,updateCarHandler)
// userRouter.route("/booking/:id").patch(auth,cancelBooking)





// export {userRouter}









//////////////////////////////////////////////////////////////


import { Router } from "express";
import {   logoutHandler, loginHandler, registrationHandler, loginCheck, getAllUserBookings, cancelBooking } from "../controllers/userhandlers.js";
import {  getAllBrands,getAllModels,getuplodedCars,getSingleCars, updateBookingCarHandler, fetchSingleUser} from "../controllers/adminHandle.js";
import { auth } from "../middlewares/auth.js";


const userRouter =  Router();

//get routes ///////////////////////////////

userRouter.route("/cars/brand").get(getAllBrands);
userRouter.route("/cars/model").get(getAllModels);
userRouter.route("/cars").get(getuplodedCars);
userRouter.route("/cars/:id").get(auth,getSingleCars);
userRouter.route("/user/:id").get(auth,fetchSingleUser);
userRouter.route("/booking").get(auth,getAllUserBookings)
userRouter.route("/logincheck").get(auth,loginCheck)

//post routes //////////////////////////////////////
userRouter.route("/register").post(registrationHandler);
userRouter.route("/login").post(loginHandler);
userRouter.route("/logout").post(auth,logoutHandler);

//patch routes/////////////////////////////////////////////

userRouter.route("/cars/:id").patch(auth,updateBookingCarHandler)
userRouter.route("/booking/:id").patch(auth,cancelBooking)


export {userRouter}







