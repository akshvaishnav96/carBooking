import { User } from "../schema/userSchema.js";
import { Brand } from "../schema/brandsSchema.js";
import { Model } from "../schema/modelSchema.js";
import fs from "fs/promises";
import { Car } from "../schema/carSchema.js";
import { Msg } from "../schema/messageSchema.js";
import { fileUplode } from "../utils/cloudnary.js";
import mongoose from "mongoose";

async function addBrandHandler(req, res) {
  try {
    const { brand } = req.body;
    if (!brand) throw new Error("Brand is required");

    let lowerCaseBrand = brand.toLowerCase();

    const alreadyExist = await Brand.findOne({ brand: lowerCaseBrand });
    if (alreadyExist) throw new Error("brand already exist");

    const result = await Brand.create({ brand });
    const newData = await Brand.find({});

    res
      .status(201)
      .json({ status: true, msg: "successFully added Brand", result: newData });
  } catch (error) {
    res.status(400).json({ status: false, msg: error.message, result: "" });
  }
}
async function addModelhandler(req, res) {
  try {
    const { brand, model } = req.body;


    if (!brand) throw new Error("Brand is required");
    if (!model) throw new Error("Model is required");

    const lowerCaseModel = model.toLowerCase();

    const alreadyExist = await Model.findOne({
      $and: [{ brand }, { model:lowerCaseModel}],
    });

  
    if (alreadyExist) throw new Error("model already exist with this Brand");
    const result = await Model.create({ brand, model });

    
    const newData = await Model.aggregate([
      {
        $lookup: {
          from: "brands",
          localField: "brand",
          foreignField: "_id",
          as: "brand",
        },
      },
      {
        $addFields: {
          brand: {
            $first: "$brand",
          },
        },
      },
    ]);

    res
      .status(201)
      .json({ status: true, msg: "successFully added Model", result: newData });
  } catch (error) {
    res.status(400).json({ status: false, msg: error.message, result: "" });
  }
}
async function addCarHandler(req, res) {
  try {
    const { model, brand, description, carnumber } = req.body;
    const images = req.files["images"];

    const existCar = await Car.findOne({ carnumber });

    if (existCar) throw new Error("car already exist with this number");
    if (!model) throw new Error("Car Model is required");
    if (!brand) throw new Error("Car Brand is required");
    if (!description) throw new Error("Car description is required");
    if (!carnumber) throw new Error("Car Number is required");

    const lowerCaseCarNumber = carnumber.toLowerCase();
    const imagesPath = await fileUplode(images[0].path);


    const car = await Car.create({
      brand,
      model,
      description,
      carnumber: lowerCaseCarNumber,
      images: imagesPath ? [imagesPath.url] : [],
    });

    if (!car) throw new Error("car not uploded successfully");
    const updatedData = await Car.aggregate(


      [
        
        {
          $lookup: {
            from: "brands",
            localField: "brand",
            foreignField: "_id",
            as: "brand",
          },
        },
        {
          $lookup: {
            from: "models",
            localField: "model",
            foreignField: "_id",
            as: "model",
          },
        },
        {
          $addFields: {
            brand: { $first: "$brand" },
            model: { $first: "$model" },
          },
        },
      ]
  
    )
    res.status(201).json({
      status: true,
      msg: "car adding Successfully",
      result: updatedData,
    });
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

async function updateBrandHandler(req, res) {
  try {
    const { brand } = req.body;
    const { id } = req.params;

    

    if(!brand) throw new Error("brand is required")

        const brandExist =await Brand.findOne({_id:id});
        if(!brandExist) throw new Error("brand not found")

    const alreadyExist = await Brand.findOne({ brand }, { _id: { $not: id } });
    if (alreadyExist) throw new Error("brand already exist");

    const updatedBrand = await Brand.findOneAndUpdate({ _id: id }, { brand });

    const newData = await Brand.find({});

    res
      .status(201)
      .json({
        status: true,
        msg: "successFully updated Brand",
        result: newData,
      });
  } catch (error) {
    
    return res
      .status(400)
      .json({ status: false, msg: error.message, result: [] });
  }
}

async function updateModelHandler(req, res) {
  try {
    const { model } = req.body;
    const { id } = req.params;
    const { brand } = req.body;

    if(!brand) throw new Error("brand is required")
      if(!model) throw new Error("model is required")

        const existData = await Model.findById(id);

        if(!existData) throw new Error("model not exist")

    const alreadyExist = await Model.findOne({ model,brand }, { _id: { $not: id } });
    if (alreadyExist) throw new Error("model already exist");

    let updationObj;

    if (model&&brand) {
      updationObj = {model,brand}
    }else if(model){
      updationObj = {model}
    }else if(brand){
      updationObj = {brand}
    }


    const updatedModel = await Model.findOneAndUpdate({ _id: id }, updationObj);

    const newData = await Model.aggregate([
      {
        $lookup: {
          from: "brands",
          localField: "brand",
          foreignField: "_id",
          as: "brand",
        },
      },
      {
        $addFields: {
          brand: {
            $first: "$brand",
          },
        },
      },
    ]);

    res
      .status(201)
      .json({ status: true, msg: "successFully updated Model", result: newData });
  } catch (error) {
    return res.status(400).json({status:false, msg: error.message,result:[] });
  }
}

async function updateBookingCarHandler(req, res) {
  try {
    const id = req.params.id;
    const { startdate, enddate, name, email, mobile, address } = req.body;

    if (!email) throw new Error("email is required");
    if (!name) throw new Error("name is required");
    if (!mobile) throw new Error("mobile number is required");
    if (!address) throw new Error("address  is required");
    const carData = await Car.findById(id);
    carData.startdate = new Date(startdate).toDateString();
    carData.enddate = new Date(enddate).toDateString();
    carData.booked = true;

    await carData.save();

    const msgResponse = await Msg.create({
      startdate: new Date(startdate).toDateString(),
      enddate: new Date(enddate).toDateString(),
      carDetails: carData._id,
      email,
      name,
      mobile,
      address,
    });

    if (!msgResponse) throw new Error("something went wrong when add message");

    const newData = await Car.aggregate([
      {
        $lookup: {
          from: "brands",
          localField: "brand",
          foreignField: "_id",
          as: "brand",
        },
      },
      {
        $lookup: {
          from: "models",
          localField: "model",
          foreignField: "_id",
          as: "model",
        },
      },

      {
        $addFields: {
          brand: { $first: "$brand" },
          model: { $first: "$model" },
        },
      },
    ]);
    const msgData = await Msg.aggregate([
      {
        $lookup: {
          from: "cars",
          localField: "carDetails",
          foreignField: "_id",
          as: "carDetails",
          pipeline: [
            {
              $lookup: {
                from: "brands",
                localField: "brand",
                foreignField: "_id",
                as: "brand",
              },
            },
            {
              $lookup: {
                from: "models",
                localField: "model",
                foreignField: "_id",
                as: "model",
              },
            },

            {
              $addFields: {
                brand: { $first: "$brand" },
                model: { $first: "$model" },
              },
            },
          ],
        },
      },
      {
        $addFields: {
          carDetails: {
            $first: "$carDetails",
          },
        },
      },
    ]);

    const loggedUser = await User.findById(req.user._id);
    loggedUser.booking.push(msgResponse);
    loggedUser.save();
    res.status(200).json({
      msg: "successfully updated",
      status: true,
      result: { newData, msgData },
    });
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false, result: "" });
  }
}

async function deleteCarHandler(req, res) {
  try {
    const id = req.params.id;
    const carData = await Car.findById(id);

    if (!carData) throw new Error("nothing to delete something went wrong");

    await Promise.all(
      carData["images"].map(async (item) => {
        try {
          await fs.unlink(`./public/${item}`);
        } catch (err) {
          console.error(`Error removing file ${item.originalname}:`, err);
        }
      })
    );

    await Car.findByIdAndDelete(id);
    const newData = await Car.aggregate([
      {
        $lookup: {
          from: "brands",
          localField: "brand",
          foreignField: "_id",
          as: "brand",
        },
      },
      {
        $lookup: {
          from: "models",
          localField: "model",
          foreignField: "_id",
          as: "model",
        },
      },
      {
        $addFields: {
          brand: { $first: "$brand" },
          model: { $first: "$model" },
        },
      },
    ]);

    res
      .status(200)
      .json({ status: true, msg: "Car deleted Successfully", result: newData });
  } catch (error) {
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
  const { brand } = req.query;

  try {
    let result = null;

    if (brand) {

      result = await Model.aggregate([
        {
          $match: {
            brand: new mongoose.Types.ObjectId(brand),
          },
        },
        {
          $lookup: {
            from: "brands",
            localField: "brand",
            foreignField: "_id",
            as: "brand",
          },
        },
        {
          $addFields: {
            brand: {
              $first: "$brand",
            },
          },
        },
      ]);
    } else {
      result = await Model.aggregate([
        {
          $lookup: {
            from: "brands",
            localField: "brand",
            foreignField: "_id",
            as: "brand",
          },
        },
        {
          $addFields: {
            brand: {
              $first: "$brand",
            },
          },
        },
      ]);
    }



    

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
      result = await Car.aggregate([
        {
          $match: {
            $and: [
              { brand: new mongoose.Types.ObjectId(brand) },
              { model: new mongoose.Types.ObjectId(model) },
            ],
          },
        },
        {
          $lookup: {
            from: "brands",
            localField: "brand",
            foreignField: "_id",
            as: "brand",
          },
        },
        {
          $lookup: {
            from: "models",
            localField: "model",
            foreignField: "_id",
            as: "model",
          },
        },
        {
          $addFields: {
            brand: { $first: "$brand" },
            model: { $first: "$model" },
          },
        },
      ]);
    } else if (brand) {
      result = await Car.aggregate([
        {
          $match: {
            brand: new mongoose.Types.ObjectId(brand),
          },
        },
        {
          $lookup: {
            from: "brands",
            localField: "brand",
            foreignField: "_id",
            as: "brand",
          },
        },
        {
          $lookup: {
            from: "models",
            localField: "model",
            foreignField: "_id",
            as: "model",
          },
        },
        {
          $addFields: {
            brand: { $first: "$brand" },
            model: { $first: "$model" },
          },
        },
      ]);
    } else if (model) {
      result = await Car.aggregate([
        {
          $match: {
            model: new mongoose.Types.ObjectId(model),
          },
        },
        {
          $lookup: {
            from: "brands",
            localField: "brand",
            foreignField: "_id",
            as: "brand",
          },
        },
        {
          $lookup: {
            from: "models",
            localField: "model",
            foreignField: "_id",
            as: "model",
          },
        },
        {
          $addFields: {
            brand: { $first: "$brand" },
            model: { $first: "$model" },
          },
        },
        {
          $project: {
            createdAt: 0,
            updatedAt: 0,
          },
        },
      ]);
    } else {
      result = await Car.aggregate([
        {
          $lookup: {
            from: "brands",
            localField: "brand",
            foreignField: "_id",
            as: "brand",
          },
        },
        {
          $lookup: {
            from: "models",
            localField: "model",
            foreignField: "_id",
            as: "model",
          },
        },
        {
          $addFields: {
            brand: { $first: "$brand" },
            model: { $first: "$model" },
          },
        },
      ]);
    }

    res.status(200).json({ msg: "success", status: true, result });
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false, result: "" });
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
    res.status(400).json({ msg: error.message, status: false, result: "" });
  }
}

async function deleteModelHandler(req, res) {
  try {
    const id = req.params.id;
    const modelData = await Model.findByIdAndDelete(id);

    if (!modelData) throw new Error("nothing to delete something went wrong");

    let result = await Model.aggregate([
      {
        $lookup: {
          from: "brands",
          localField: "brand",
          foreignField: "_id",
          as: "brand",
        },
      },
      {
        $addFields: {
          brand: {
            $first: "$brand",
          },
        },
      },
    ]);

    res.status(200).json({
      status: true,
      msg: "Model deleted Successfully",
      result
    });
  } catch (error) {
    res.status(400).json({ status: false, msg: error.message, result: "" });
  }
}

async function deleteBrandHandler(req, res) {
  try {
    const id = req.params.id;
    const brandData = await Brand.findByIdAndDelete(id);

    if (!brandData) throw new Error("nothing to delete something went wrong");

    const newData = await Brand.find({});

    res.status(200).json({
      status: true,
      msg: "Brand deleted Successfully",
      result: newData,
    });
  } catch (error) {
    res.status(400).json({ status: false, msg: error.message, result: "" });
  }
}

async function deleteMsgsHandler(req, res) {
  try {
    const id = req.params.id;
    const msgData = await Msg.findByIdAndDelete(id);

    if (!msgData) throw new Error("nothing to delete something went wrong");

    const newData = await Msg.aggregate([
      {
        $lookup: {
          from: "cars",
          localField: "carDetails",
          foreignField: "_id",
          as: "carDetails",
          pipeline: [
            {
              $lookup: {
                from: "brands",
                localField: "brand",
                foreignField: "_id",
                as: "brand",
              },
            },
            {
              $lookup: {
                from: "models",
                localField: "model",
                foreignField: "_id",
                as: "model",
              },
            },
            {
              $addFields: {
                model: {
                  $first: "$model",
                },
                brand: {
                  $first: "$brand",
                },
              },
            },
          ],
        },
      },
      {
        $addFields: {
          carDetails: {
            $first: "$carDetails",
          },
        },
      },
    ]);

    res
      .status(200)
      .json({ status: true, msg: "Model delete Successfully", result: newData });
  } catch (error) {
    res.status(400).json({ status: false, msg: error.message, result: "" });
  }
}

async function getSingleCars(req, res) {
  try {
    const id = req.params.id;
    // const car = await Car.findById(id);

      const car = await Car.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "brands",
          localField: "brand",
          foreignField: "_id",
          as: "brand",
        },
      },
      {
        $lookup: {
          from: "models",
          localField: "model",
          foreignField: "_id",
          as: "model",
        },
      },
      {
        $addFields: {
          brand: { $first: "$brand" },
          model: { $first: "$model" },
        },
      },
    ]);

    if (!car) {
      throw new Error("Car not found");
    }
    res.status(200).json({ msg: "success", status: true, result: car });
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false, result: "" });
  }
}

async function getMsgs(req, res) {
  try {
    const msg = await Msg.aggregate([
      {
        $lookup: {
          from: "cars",
          localField: "carDetails",
          foreignField: "_id",
          as: "carDetails",
          pipeline: [
            {
              $lookup: {
                from: "brands",
                localField: "brand",
                foreignField: "_id",
                as: "brand",
              },
            },
            {
              $lookup: {
                from: "models",
                localField: "model",
                foreignField: "_id",
                as: "model",
              },
            },
            {
              $addFields: {
                model: {
                  $first: "$model",
                },
                brand: {
                  $first: "$brand",
                },
              },
            },
          ],
        },
      },
      {
        $addFields: {
          carDetails: {
            $first: "$carDetails",
          },
        },
      },
    ]);

    if (!msg) {
      throw new Error("Msgs not found");
    }
    res.status(200).json({ msg: "success", status: true, result: msg });
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false, result: "" });
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
  getSingleCars,
  deleteCarHandler,
  updateBookingCarHandler,
  getMsgs,
  deleteModelHandler,
  deleteBrandHandler,
  deleteMsgsHandler,
  updateBrandHandler,
  updateModelHandler,
};
