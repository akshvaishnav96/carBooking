import { User } from "../schema/userSchema.js";
import { Brand } from "../schema/brandsSchema.js";
import { Model } from "../schema/modelSchema.js";
import fs from "fs/promises";
import { Car } from "../schema/carSchema.js";

async function addBrandHandler(req, res) {
  try {
    const { brand } = req.body;
    if (!brand) throw new Error("Brand is required");

    const alreadyExist = await Brand.findOne({ brand });
    if (alreadyExist) throw new Error("brand already exist");

    const result = await Brand.create({ brand });

    res
      .status(201)
      .json({ status: true, msg: "successFully added Brand", result });
  } catch (error) {
    res.status(400).json({ status: false, msg: error.message, result: "" });
  }
}

async function addModelhandler(req, res) {
  try {
    const { brand, model } = req.body;

    if (!brand) throw new Error("Brand is required");
    if (!model) throw new Error("Model is required");

    const alreadyExist = await Model.findOne({ $and: [{ brand }, { model }] });
    if (alreadyExist) throw new Error("model already exist with this Brand");
    const result = await Model.create({ brand, model });

    res
      .status(201)
      .json({ status: true, msg: "successFully added Model", result });
  } catch (error) {
    res.status(400).json({ status: false, msg: error.message, result: "" });
  }
}

async function addCarHandler(req, res) {
  try {
    const { model, brand, description, carnumber } = req.body;
    const images = req.files["images"];

    const existCar = await Car.findOne({carnumber});
    console.log(existCar);
    

    if (existCar) throw new Error("car already exist with this number");
    if (!model) throw new Error("Car Model is required");
    if (!brand) throw new Error("Car Brand is required");
    if (!description) throw new Error("Car description is required");
    if (!carnumber) throw new Error("Car Number is required");

    const imagesPath = images.map((item) => "/images/" + item.originalname);

    const car = await Car.create({
      brand,
      model,
      description,
      carnumber,
      images: imagesPath ? imagesPath : [],
    });

    if (!car) throw new Error("car not uploded successfully");

    res
      .status(200)
      .json({ status: true, msg: "car adding Successfully", result: car });
  } catch (error) {
    await Promise.all(
      req.files["images"].map(async (item) => {
        try {
          await fs.unlink(`./public/images/${item.originalname}`);
        } catch (err) {
          console.error(`Error removing file ${item.originalname}:`, err);
        }
      })
    );
    res.status(400).json({ status: false, msg: error.message, result: "" });
  }
}

async function getAllBrands(req, res) {
  try {
    const result = await Brand.find({});
    res
      .status(200)
      .json({ status: true, msg: "brand fetched successfully", result });
  } catch (error) {
    res.status(400).json({ status: false, msg: error.message, result: "" });
  }
}
async function getAllModels(req, res) {
  try {
    const result = await Model.find({});
    res
      .status(200)
      .json({ status: true, msg: "model fetched successfully", result });
  } catch (error) {
    res.status(400).json({ status: false, msg: error.message, result: "" });
  }
}
async function getuplodedCars(req, res) {
  try {
    const { brand, model } = req.query;
  
    let result = "";


    
    if (brand && model) {
      result = await Car.find({ $and: [{ brand }, { model }] });
    }else if(brand){
      result = await Car.find({ brand });
    }else if(model){
      result = await Car.find({ model });
    }else{
      result = await Car.find({});
    }
    res.status(200).json({ msg: "success", status: true, result });
  } catch (error) {
    res.status(400).json({ msg: "failed", status: falsd, result: "" });
  }
}

async function fetchAllUsers(req, res) {
  try {
    const allUsers = await User.find({}).select("-password -refresh-token");
    res
      .status(200)
      .json({ status: true, result: allUsers, msg: "successfully fetched" });
  } catch (error) {
    res.status(400).json({ status: false, msg: error.message, result: "" });
  }
}

async function fetchSingleUser(req, res) {
  try {
    const id = req.params.id;
    const user = await User.findById(id).select("-password -refreshToken");
    if (!user) {
      throw new Error("user not found");
    }
    res.status(200).json({ msg: "success", status: true, result: user });
  } catch (error) {
    res.status(200).json({ msg: error.message, status: false, result: "" });
  }
}

export {
  addBrandHandler,
  addCarHandler,
  addModelhandler,
  getAllBrands,
  getAllModels,
  getuplodedCars,
  fetchAllUsers,
  fetchSingleUser,
};
