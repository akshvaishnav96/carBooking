import { getAllBrands } from "./controllers/adminHandle";
import request from "supertest";
import { app } from "./index";
import { Brand } from "./schema/brandsSchema";

afterAll(async () => {
  await Brand.deleteMany();
});
describe("addBrand", () => {
  it("should return brands updated one - addBrandHandler", async () => {
    const response = await request(app)
      .post("/api/v1/admin/cars/brand")
      .send({ brand: "text21" });
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

  it("should return status 400 - addBrandHandler, brand already exists", async () => {
    await request(app)
      .post("/api/v1/admin/cars/brand")
      .send({ brand: "text21" }); 
    const response = await request(app)
      .post("/api/v1/admin/cars/brand")
      .send({ brand: "text21" });
    expect(response.status).toBe(400);
    expect(response.body.status).toBe(false);
    expect(response.body.msg).toBe("brand already exist");
  });

  it("should return status 400 - addBrandHandler, brand with leading/trailing spaces", async () => {
    const response = await request(app)
      .post("/api/v1/admin/cars/brand")
      .send({ brand: "   text22   " });
    expect(response.status).toBe(201);
    expect(response.body.status).toBe(true);
    expect(response.body.result).toBeDefined();

    const secondResponse = await request(app)
      .post("/api/v1/admin/cars/brand")
      .send({ brand: "text22" });
    expect(secondResponse.status).toBe(400);
    expect(secondResponse.body.status).toBe(false);
    expect(secondResponse.body.msg).toBe("brand already exist");
  });

  it("should return status 400 - addBrandHandler, brand as a number", async () => {
    const response = await request(app)
      .post("/api/v1/admin/cars/brand")
      .send({ brand: 123 });
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
    const response = await request(app)
      .post("/api/v1/admin/cars/model")
      .send({ brand: "text21", model: "modelA" });
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
    await request(app)
      .post("/api/v1/admin/cars/model")
      .send({ brand: "text21", model: "modelA" }); 
    const response = await request(app)
      .post("/api/v1/admin/cars/model")
      .send({ brand: "text21", model: "modelA" });
    expect(response.status).toBe(400);
    expect(response.body.status).toBe(false);
    expect(response.body.msg).toBe("model already exist with this Brand");
  });

  it("should return status 400 - addModelHandler, brand with leading/trailing spaces", async () => {
    const response = await request(app)
      .post("/api/v1/admin/cars/model")
      .send({ brand: "   text22   ", model: "modelB" });
    expect(response.status).toBe(201);
    expect(response.body.status).toBe(true);
    expect(response.body.result).toBeDefined();

    const secondResponse = await request(app)
      .post("/api/v1/admin/cars/model")
      .send({ brand: "text22", model: "modelB" });
    expect(secondResponse.status).toBe(400);
    expect(secondResponse.body.status).toBe(false);
    expect(secondResponse.body.msg).toBe("model already exist with this Brand");
  });

  it("should return status 400 - addModelHandler, model as a number", async () => {
    const response = await request(app)
      .post("/api/v1/admin/cars/model")
      .send({ brand: "text21", model: 123 });
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

describe("addCar", () => {

      it("should add a car successfully - addCarHandler", async () => {
          const response = await request(app)
              .post("/api/v1/admin/cars")
              .field("brand", "text21")
              .field("model", "modelA")
              .field("description", "A great car")
              .field("carnumber", "ABC123")
              .attach("images", "path/to/image.jpg");
  
          expect(response.status).toBe(200);
          expect(response.body.status).toBe(true);
          expect(response.body.msg).toBe("car adding Successfully");
          expect(response.body.result).toBeDefined();
      });
  
      it("should return status 400 - addCarHandler, missing model", async () => {
          const response = await request(app)
              .post("/api/v1/admin/cars")
              .field("brand", "text21")
              .field("description", "A great car")
              .field("carnumber", "ABC123")
              .attach("images", "path/to/image.jpg");
  
          expect(response.status).toBe(400);
          expect(response.body.status).toBe(false);
          expect(response.body.msg).toBe("Car Model is required");
      });
  
      it("should return status 400 - addCarHandler, missing brand", async () => {
          const response = await request(app)
              .post("/api/v1/admin/cars")
              .field("model", "modelA")
              .field("description", "A great car")
              .field("carnumber", "ABC123")
              .attach("images", "path/to/image.jpg");
  
          expect(response.status).toBe(400);
          expect(response.body.status).toBe(false);
          expect(response.body.msg).toBe("Car Brand is required");
      });
  
      it("should return status 400 - addCarHandler, missing description", async () => {
          const response = await request(app)
              .post("/api/v1/admin/cars")
              .field("brand", "text21")
              .field("model", "modelA")
              .field("carnumber", "ABC123")
              .attach("images", "path/to/image.jpg");
  
          expect(response.status).toBe(400);
          expect(response.body.status).toBe(false);
          expect(response.body.msg).toBe("Car description is required");
      });
  
      it("should return status 400 - addCarHandler, missing carnumber", async () => {
          const response = await request(app)
              .post("/api/v1/admin/cars")
              .field("brand", "text21")
              .field("model", "modelA")
              .field("description", "A great car")
              .attach("images", "path/to/image.jpg");
  
          expect(response.status).toBe(400);
          expect(response.body.status).toBe(false);
          expect(response.body.msg).toBe("Car Number is required");
      });
  
      it("should return status 400 - addCarHandler, car already exists", async () => {
          await request(app)
              .post("/api/v1/admin/cars")
              .field("brand", "text21")
              .field("model", "modelA")
              .field("description", "A great car")
              .field("carnumber", "ABC123")
              .attach("images", "path/to/image.jpg");
  
          const response = await request(app)
              .post("/api/v1/admin/cars")
              .field("brand", "text21")
              .field("model", "modelB")
              .field("description", "Another great car")
              .field("carnumber", "ABC123")
              .attach("images", "path/to/image.jpg");
  
          expect(response.status).toBe(400);
          expect(response.body.status).toBe(false);
          expect(response.body.msg).toBe("car already exist with this number");
      });
  
      it("should return status 400 - addCarHandler, error during file upload", async () => {
          const response = await request(app)
              .post("/api/v1/admin/cars")
              .field("brand", "text21")
              .field("model", "modelA")
              .field("description", "A great car")
              .field("carnumber", "ABC123")
              .attach("images", "invalid/path/to/image.jpg"); // Invalid path to trigger error
  
          expect(response.status).toBe(400);
          expect(response.body.status).toBe(false);
          expect(response.body.msg).toBeDefined(); // Check if the error message is appropriate
      });
  
  });
  describe("GET /cars/brand", () => {
  
      it("should fetch all brands - getAllBrands", async () => {
        const response = await request(app).get("/api/v1/admin/cars/brand").set("Authorization", `Bearer ${token}`); 
        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.result).toBeDefined();
      });
    
      it("should return status 401 - getAllBrands, unauthorized", async () => {
        const response = await request(app).get("/api/v1/admin/cars/brand");
        expect(response.status).toBe(401);
        expect(response.body.status).toBe(false);
      });
    });
      
    describe("GET /cars/model", () => {

      it("should fetch all models - getAllModels", async () => {
        const response = await request(app).get("/api/v1/admin/cars/model").set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.result).toBeDefined();
      });
    
      it("should return models filtered by brand - getAllModels", async () => {
        const brandId = "someValidBrandId";
        const response = await request(app).get(`/api/v1/admin/cars/model?brand=${brandId}`).set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.result).toBeDefined();
      });
    
      it("should return status 401 - getAllModels, unauthorized", async () => {
        const response = await request(app).get("/api/v1/admin/cars/model");
        expect(response.status).toBe(401);
        expect(response.body.status).toBe(false);
      });
    });
    

    describe("GET /cars", () => {

      it("should fetch all uploaded cars - getuplodedCars", async () => {
        const response = await request(app).get("/api/v1/admin/cars").set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.result).toBeDefined();
      });
    
      it("should return status 401 - getuplodedCars, unauthorized", async () => {
        const response = await request(app).get("/api/v1/admin/cars");
        expect(response.status).toBe(401);
        expect(response.body.status).toBe(false);
      });
    });
 
    
    describe("GET /cars/msg", () => {

      it("should fetch all messages - getMsgs", async () => {
        const response = await request(app).get("/api/v1/admin/cars/msg").set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.result).toBeDefined();
      });
    
      it("should return status 401 - getMsgs, unauthorized", async () => {
        const response = await request(app).get("/api/v1/admin/cars/msg");
        expect(response.status).toBe(401);
        expect(response.body.status).toBe(false);
      });
    });
    

    describe("GET /cars/:id", () => {

      it("should fetch a single car - getSingleCars", async () => {
        const carId = "someValidCarId"; 
        const response = await request(app).get(`/api/v1/admin/cars/${carId}`).set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.result).toBeDefined();
      });
    
      it("should return status 404 - getSingleCars, car not found", async () => {
        const carId = "invalidCarId";
        const response = await request(app).get(`/api/v1/admin/cars/${carId}`).set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(404);
        expect(response.body.status).toBe(false);
      });
    
      it("should return status 401 - getSingleCars, unauthorized", async () => {
        const carId = "someValidCarId";
        const response = await request(app).get(`/api/v1/admin/cars/${carId}`);
        expect(response.status).toBe(401);
        expect(response.body.status).toBe(false);
      });
    });
    