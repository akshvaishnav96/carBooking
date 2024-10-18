// import { Router } from "express";
// import {
//   addBrandHandler,
//   addCarHandler,
//   addModelhandler,
//   deleteBrandHandler,
//   deleteCarHandler,
//   deleteModelHandler,
//   deleteMsgsHandler,
//   fetchAllUsers,
//   fetchSingleUser,
//   getAllBrands,
//   getAllModels,
//   getMsgs,
//   getSingleCars,
//   getuplodedCars,
//   updateCarHandler,
// } from "../controllers/adminHandle.js";
// import { auth } from "../middlewares/auth.js";
// import { upload } from "../middlewares/multer.js";

// const adminRouter = Router();

// // get routes //////////////////////////////////////
// adminRouter.route("/cars/brand").get(auth,getAllBrands);
// adminRouter.route("/cars/model").get(auth,getAllModels);
// adminRouter.route("/cars").get(auth,getuplodedCars);



// // auth roughts


// adminRouter.route("/cars/msg").get(auth,getMsgs);
// adminRouter.route("/users").get(auth,fetchAllUsers);
// adminRouter.route("/users/:id").get(auth,fetchSingleUser);
// adminRouter.route("/cars/:id").get(auth,getSingleCars);


// // post routes /////////////////////////////////////
// adminRouter.route("/cars/brand").post(addBrandHandler);
// adminRouter.route("/cars/model").post(auth,addModelhandler);

// adminRouter
//   .route("/cars")
//   .post(auth,upload.fields([{ name: "images", maxCount: 4 }]), addCarHandler);

// /////////////////////////////////////////////////////
// adminRouter.route("/cars/:id").delete(auth,deleteCarHandler)
// adminRouter.route("/cars/model/:id").delete(auth,deleteModelHandler)
// adminRouter.route("/cars/brand/:id").delete(auth,deleteBrandHandler)
// adminRouter.route("/cars/msg/:id").delete(auth,deleteMsgsHandler)

// ///////////////////////////////////////////////////////
// adminRouter.route("/cars/:id").patch(auth,updateCarHandler)

// export { adminRouter };




















///////////////////////////////////




import { Router } from "express";
import {
  addBrandHandler,
  addCarHandler,
  addModelhandler,
  deleteBrandHandler,
  deleteCarHandler,
  deleteModelHandler,
  deleteMsgsHandler,
  fetchAllUsers,
  fetchSingleUser,
  getAllBrands,
  getAllModels,
  getMsgs,
  getSingleCars,
  getuplodedCars,
  updateCarHandler,
} from "../controllers/adminHandle.js";
import { auth } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";

const adminRouter = Router();

// get routes //////////////////////////////////////
adminRouter.route("/cars/brand").get(getAllBrands);
adminRouter.route("/cars/model").get(getAllModels);
adminRouter.route("/cars").get(getuplodedCars);



// roughts


adminRouter.route("/cars/msg").get(getMsgs);
adminRouter.route("/users").get(fetchAllUsers);
adminRouter.route("/users/:id").get(fetchSingleUser);
adminRouter.route("/cars/:id").get(getSingleCars);


// post routes /////////////////////////////////////
adminRouter.route("/cars/brand").post(addBrandHandler);
adminRouter.route("/cars/model").post(addModelhandler);

adminRouter
  .route("/cars")
  .post(upload.fields([{ name: "images", maxCount: 4 }]), addCarHandler);

/////////////////////////////////////////////////////
adminRouter.route("/cars/:id").delete(deleteCarHandler)
adminRouter.route("/cars/model/:id").delete(deleteModelHandler)
adminRouter.route("/cars/brand/:id").delete(deleteBrandHandler)
adminRouter.route("/cars/msg/:id").delete(deleteMsgsHandler)

///////////////////////////////////////////////////////
adminRouter.route("/cars/:id").patch(updateCarHandler)

export { adminRouter };
