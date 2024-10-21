import request from "supertest";
import { app } from "./index";
import { Brand } from "./schema/brandsSchema";
import { Model } from "./schema/modelSchema";
import { Car } from "./schema/carSchema";
import { Msg } from "./schema/messageSchema";
import mongoose, { model } from "mongoose";
import { fileUplode } from "./utils/cloudnary";





afterAll(async () => {
  await Brand.deleteMany();
  await Model.deleteMany();
  await Car.deleteMany();
  await Msg.deleteMany();
});





describe("GET /cars/brand", () => {

  it("should fetch all models - getAllBrands", async () => {
    const response = await request(app).get("/api/v1/admin/cars/brand")
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.result).toBeDefined();
  });

});

describe("GET /cars/model", () => {

  it("should fetch all models - getAllModels", async () => {
    const response = await request(app).get("/api/v1/admin/cars/model")
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.result).toBeDefined();
  });



});


describe("GET /cars", () => {

  it("should fetch all uploaded cars - getuplodedCars", async () => {
    const response = await request(app).get("/api/v1/admin/cars")
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.result).toBeDefined();
  });


});


describe("GET /cars/:id", () => {

  // it("should fetch all uploaded cars - getuplodedCars", async () => {
  //   const response = await request(app).get(`/api/v1/admin/cars/${carData[0]._id}`)
  //   expect(response.status).toBe(200);
  //   expect(response.body.status).toBe(true);
  //   expect(response.body.result).toBeDefined();
  // });

  it("should fetch all single car - getSingleCars", async () => {
    const response = await request(app).get(`/api/v1/admin/cars/${new mongoose.Types.ObjectId}`)
    expect(response.status).toBe(400);
    expect(response.body.status).toBe(false);
    expect(response.body.msg).toBe("Car not found");
  });


});


describe("GET /cars/msg", () => {

  it("should fetch all messages - getMsgs", async () => {
    const response = await request(app).get("/api/v1/admin/cars/msg")
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.result).toBeDefined();
  });

});


describe("Post addBrand", () => {
  it("should return models update one - addBrandHandler", async () => {
    const response = await request(app)
      .post("/api/v1/admin/cars/brand")
      .send({ brand: "text22" });
    expect(response.status).toBe(201);
    expect(response.body.status).toBe(true);
    expect(response.body.msg).toBe("successFully added Brand");
    expect(response.body.result).toBeDefined();
  });

  it("should return status 400 - addBrandHandler, missing brand", async () => {
    const response = await request(app)
      .post("/api/v1/admin/cars/brand")
      .send({});
    expect(response.status).toBe(400);
    expect(response.body.status).toBe(false);
    expect(response.body.msg).toBe("Brand is required");
  });


  it("should return status 400 - addBrandHandler, brand as an empty string", async () => {
    const response = await request(app)
      .post("/api/v1/admin/cars/brand")
      .send({ brand: "" });
    expect(response.status).toBe(400);
    expect(response.body.status).toBe(false);
    expect(response.body.msg).toBe("Brand is required");
  });

  it("should return status 400 - addBrandHandler, brand already exist", async () => {
    const brand = await Brand.find({}).limit(1)
    console.log(brand);

    const response = await request(app)
      .post("/api/v1/admin/cars/brand")
      .send({ brand: brand[0].brand });
    expect(response.status).toBe(400);
    expect(response.body.status).toBe(false);
    expect(response.body.msg).toBe("brand already exist");
  });


});

describe("Post addModel", () => {
  it("should return models updated one - addModelHandler", async () => {

    const brandId = await Brand.find({}).limit(1);


    const response = await request(app)
      .post("/api/v1/admin/cars/model")
      .send({ brand: brandId[0]._id, model: "modelA" });
    expect(response.status).toBe(201);
    expect(response.body.status).toBe(true);
    expect(response.body.msg).toBe("successFully added Model");
    expect(response.body.result).toBeDefined();
  });

  it("should return status 400 - addModelHandler, model already exists with the brand", async () => {
    const brand = await Brand.find({}).limit(1);
    const model = await Model.find({}).limit(1);
    const response = await request(app)
      .post(`/api/v1/admin/cars/model`)
      .send({ brand: brand[0]._id, model: model[0].model });
    expect(response.status).toBe(400);
    expect(response.body.status).toBe(false);
    expect(response.body.msg).toBe("model already exist with this Brand");
  });

  it("should return status 400 - addModelHandler, missing brand", async () => {
    const response = await request(app)
      .post("/api/v1/admin/cars/model")
      .send({ model: "modelA" });
    expect(response.status).toBe(400);
    expect(response.body.status).toBe(false);
    expect(response.body.msg).toBe("Brand is required");
  });

  it("should return status 400 - addModelHandler, missing model", async () => {
    const response = await request(app)
      .post("/api/v1/admin/cars/model")
      .send({ brand: "text21" });
    expect(response.status).toBe(400);
    expect(response.body.status).toBe(false);
    expect(response.body.msg).toBe("Model is required");
  });

  it("should return status 400 - addModelHandler, model as an empty string", async () => {
    const response = await request(app)
      .post("/api/v1/admin/cars/model")
      .send({ brand: "text21", model: "" });
    expect(response.status).toBe(400);
    expect(response.body.status).toBe(false);
    expect(response.body.msg).toBe("Model is required");
  });
});


describe("Post addCar",()=>{



 it("should add a new Car",async()=>{

  const model = await Model.find({}).limit(1)
  const brand = await Brand.find({}).limit(1)
    const response = await request(app).post("/api/v1/admin/cars").send({model:model[0]._id,brand:brand[0]._id,description:"asdasdasd",carnumber:"rj14-cd-1111"}).attach("images",[{path:"./randomImages.jpg"}])
    expect(response.status).toBe(201)
 })
})



describe('Patch /cars/brand/:id', () => {

  it("should return brands update one - updateBrandHandler", async () => {
    const brandData = await Brand.find({});
    const response = await request(app)
      .patch(`/api/v1/admin/cars/brand/${brandData[0]._id}`)
      .send({ brand: "update2" });
    expect(response.status).toBe(201);
    expect(response.body.status).toBe(true);
    expect(response.body.msg).toBe("successFully updated Brand");
    expect(response.body.result).toBeDefined();
  });


  it("should return error brand is required - updateBrandHandler", async () => {
    const brandData = await Brand.find({});
    const response = await request(app)
      .patch(`/api/v1/admin/cars/brand/${brandData[0]._id}`)
      .send({});
    expect(response.status).toBe(400);
    expect(response.body.status).toBe(false);
    expect(response.body.msg).toBe("brand is required");
  });

  it("should return brand already exist - updateBrandHandler", async () => {
    const brandData = await Brand.find({});

    const response = await request(app)
      .patch(`/api/v1/admin/cars/brand/${brandData[0]._id}`)
      .send({ brand: "update2" });
    expect(response.status).toBe(400);
    expect(response.body.status).toBe(false);
    expect(response.body.msg).toBe("brand already exist");
  });


  it("should return brand already exist - updateBrandHandler", async () => {
    const brandData = await Brand.find({});

    const response = await request(app)
      .patch(`/api/v1/admin/cars/brand/${new mongoose.Types.ObjectId}`)
      .send({brand:"update2"});
    expect(response.status).toBe(400);
    expect(response.body.status).toBe(false);
    expect(response.body.msg).toBe("brand not found");
  });

  


 

})

describe('Patch /cars/model/:id', () => {

  it("should return models update one - updateModelHandler", async () => {
    const brandData = await Brand.find({});
    const modelData = await Model.find({});
    const response = await request(app)
      .patch(`/api/v1/admin/cars/model/${modelData[0]._id}`)
      .send({ brand: brandData[0]._id, model: "updated1" });
    expect(response.status).toBe(201);
    expect(response.body.status).toBe(true);
    expect(response.body.msg).toBe("successFully updated Model");
    expect(response.body.result).toBeDefined();
  });


  it("should return error brand is required - updateModelHandler", async () => {
    const brandData = await Brand.find({});
    const modelData = await Model.find({});
    const response = await request(app)
      .patch(`/api/v1/admin/cars/model/${modelData[0]._id}`)
      .send({ model: "updated2" });
    expect(response.status).toBe(400);
    expect(response.body.status).toBe(false);
    expect(response.body.msg).toBe("brand is required");
  });

  it("should return error model is required - updateModelHandler", async () => {
    const brandData = await Brand.find({});
    const modelData = await Model.find({});
    const response = await request(app)
      .patch(`/api/v1/admin/cars/model/${modelData[0]._id}`)
      .send({ brand: brandData[0]._id });
    expect(response.status).toBe(400);
    expect(response.body.status).toBe(false);
    expect(response.body.msg).toBe("model is required");
  });

  it("should return error model is required - updateModelHandler", async () => {
    const brandData = await Brand.find({});
    const modelData = await Model.find({});
    const response = await request(app)
      .patch(`/api/v1/admin/cars/model/${new mongoose.Types.ObjectId()}`)
      .send({ brand: brandData[0]._id, model: "testModel" });
    expect(response.status).toBe(400);
    expect(response.body.status).toBe(false);
    expect(response.body.msg).toBe("model not exist");
  });

  it("should return model already exist - updateModelHandler", async () => {
    const brandData = await Brand.find({});
    const modelData = await Model.find({});
    const response = await request(app)
      .patch(`/api/v1/admin/cars/model/${modelData[0]._id}`)
      .send({ brand: brandData[0]._id, model: modelData[0].model });
    expect(response.status).toBe(400);
    expect(response.body.status).toBe(false);
    expect(response.body.msg).toBe("model already exist");
  });

})


describe("Delete /brand/:id -deleteBrandHandler", () => {

  it("should return Brand deleted Successfully -delete", async () => {
    const brandData = await Brand.find({});
    const response = await request(app).delete(`/api/v1/admin/cars/brand/${brandData[0]._id}`);
    expect(response.status).toBe(200)
    expect(response.body.status).toBe(true)
    expect(response.body.result).toBeDefined()
    expect(response.body.msg).toBe("Brand deleted Successfully")
  })


  it("should return nothing to delete something went wrong -delete", async () => {
    const brandData = await Brand.find({});
    const response = await request(app).delete(`/api/v1/admin/cars/brand/${new mongoose.Types.ObjectId()}`);
    expect(response.status).toBe(400)
    expect(response.body.status).toBe(false)
    expect(response.body.msg).toBe("nothing to delete something went wrong")
  })


})

describe("Delete /model/:id -deleteModelHandler", () => {

  it("should return model deleted Successfully -delete", async () => {
    const modelData = await Model.find({});
    const response = await request(app).delete(`/api/v1/admin/cars/model/${modelData[0]._id}`);
    expect(response.status).toBe(200)
    expect(response.body.status).toBe(true)
    expect(response.body.result).toBeDefined()
    expect(response.body.msg).toBe("Model deleted Successfully")
  })


  it("should return nothing to delete something went wrong -delete", async () => {
    const modelData = await Model.find({});
    const response = await request(app).delete(`/api/v1/admin/cars/model/${new mongoose.Types.ObjectId()}`);
    expect(response.status).toBe(400)
    expect(response.body.status).toBe(false)
    expect(response.body.msg).toBe("nothing to delete something went wrong")
  })


})


// describe("Delete /cars/msg/:id -deleteMsgsHandler", () => {

//   it("should return Msg deleted Successfully -delete", async () => {
//     const msgData = await Msg.find({});
//     const response = await request(app).delete(`/api/v1/admin/cars/msg/${msgData[0]._id}`);
//     expect(response.status).toBe(200)
//     expect(response.body.status).toBe(true)
//     expect(response.body.result).toBeDefined()
//     expect(response.body.msg).toBe("Msg deleted Successfully")
//   })


//   it("should return nothing to delete something went wrong -delete", async () => {
//     const response = await request(app).delete(`/api/v1/admin/cars/msg/${new mongoose.Types.ObjectId()}`);
//     expect(response.status).toBe(400)
//     expect(response.body.status).toBe(false)
//     expect(response.body.msg).toBe("nothing to delete something went wrong")
//   })
// })