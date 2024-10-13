import { Router } from "express";
import {
  addBrandHandler,
  addCarHandler,
  addModelhandler,
  deleteCarHandler,
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
adminRouter.route("/users").get(auth, fetchAllUsers);
adminRouter.route("/users/:id").get(fetchSingleUser);
adminRouter.route("/cars").get(getuplodedCars);
adminRouter.route("/cars/:id").get(getSingleCars);
adminRouter.route("/msg").get(getMsgs);


// post routes /////////////////////////////////////
adminRouter.route("/cars/brand").post(addBrandHandler);
adminRouter.route("/cars/model").post(addModelhandler);

adminRouter
  .route("/cars")
  .post(upload.fields([{ name: "images", maxCount: 4 }]), addCarHandler);

/////////////////////////////////////////////////////
adminRouter.route("/cars/:id").delete(deleteCarHandler)

///////////////////////////////////////////////////////
adminRouter.route("/cars/:id").patch(updateCarHandler)

export { adminRouter };
