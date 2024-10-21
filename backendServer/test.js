import request from "supertest";
import { app } from "./index";
import { Brand } from "./schema/brandsSchema";
import { Model } from "./schema/modelSchema";
import { Car } from "./schema/carSchema";
import { Msg } from "./schema/messageSchema";

afterAll(async () => {
  await Brand.deleteMany();
  await Model.deleteMany();
  await Car.deleteMany();
  await Msg.deleteMany();
});


describe("addBrand", () => {
  it("should return brands update one - addBrandHandler", async () => {
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
});

describe("addModel", () => {
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

  it("should return status 400 - addModelHandler, model already exists with the brand", async () => {


    const brandId = await Brand.find({}).limit(1);
    const model = await Model.find({}).limit(1);



    const response = await request(app)
      .post("/api/v1/admin/cars/model")
      .send({ brand: brandId[0]._id, model: model[0].model });
    expect(response.status).toBe(400);
    expect(response.body.status).toBe(false);
    expect(response.body.msg).toBe("model already exist with this Brand");
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


describe("GET /cars/brand", () => {

  it("should fetch all brands - getAllBrands", async () => {
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


describe("GET /cars/msg", () => {

  it("should fetch all messages - getMsgs", async () => {
    const response = await request(app).get("/api/v1/admin/cars/msg")
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.result).toBeDefined();
  });

});

describe("delete Car - updateCarhandler",()=>{

})

describe("delete Car - deleteCarhandler",async()=>{

  const carData = await Car.find({}).limit(1)
  const id = carData[0]._id
  const response = await request(app)
  .delete(`/api/v1/admin/cars/${id}`)
  expect(response.status).toBe(200)
  expect(response.body.status().toBe(true))
  expect(response.body.msg().toBe("Car deleted Successfully"))

})


