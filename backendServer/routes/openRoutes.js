import { Router } from "express";
import {

    getAllBrands,
    getAllModels,
    getuplodedCars,
} from "../controllers/adminHandle.js";
import { loginCheck } from "../controllers/userhandlers.js";


const openRouter = Router();

openRouter.route("/cars/brand").get(getAllBrands);
openRouter.route("/cars/model").get(getAllModels);
openRouter.route("/cars").get(getuplodedCars);
openRouter.route("/logincheck").get(loginCheck);


export { openRouter };
