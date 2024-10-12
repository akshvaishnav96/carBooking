import { Router } from "express";
import {
  addBrandHandler,
  addCarHandler,
  addModelhandler,
  fetchAllUsers,
  fetchSingleUser,
  getAllBrands,
  getAllModels,
  getuplodedCars,
} from "../controllers/adminHandle.js";
import { auth } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";

const adminRouter = Router();

// get routes //////////////////////////////////////
adminRouter.route("/brand").get(getAllBrands);
adminRouter.route("/model").get(getAllModels);
adminRouter.route("/users").get(auth, fetchAllUsers);
adminRouter.route("/users/:id").get(fetchSingleUser);
adminRouter.route("/car").get(getuplodedCars);


// post routes /////////////////////////////////////
adminRouter.route("/brand").post(addBrandHandler);
adminRouter.route("/model").post(addModelhandler);

adminRouter
  .route("/car")
  .post(upload.fields([{ name: "images", maxCount: 4 }]), addCarHandler);

export { adminRouter };
