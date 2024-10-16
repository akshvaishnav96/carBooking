import { Router } from "express";
import {

    getAllBrands,
    getAllModels,
    getuplodedCars,
} from "../controllers/adminHandle.js";


const adminRouter = Router();

adminRouter.route("/cars/brand").get(getAllBrands);
adminRouter.route("/cars/model").get(getAllModels);
adminRouter.route("/cars").get(getuplodedCars);


export { adminRouter };
