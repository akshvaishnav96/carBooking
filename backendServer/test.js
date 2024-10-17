import { getAllBrands } from "./controllers/adminHandle";
import request from "supertest";
import { app } from "./index";
import { Brand } from "./schema/brandsSchema";


afterAll(async () => {
      await Brand.deleteMany();
})
describe("addBrand", () => {



      it("should return brands updated one -addBrandHandler", async () => {
            const response = await request(app).post("/api/v1/admin/cars/brand").send({ "brand": "text21" });
            expect(response.status).toBe(201)
            expect(response.body.status).toBe(true);

      })

      it("should return status 400 -addBrandHandler ", async () => {
            const response = await request(app).post("/api/v1/admin/cars/brand").send({});
            expect(response.status).toBe(400)
            expect(response.body.status).toBe(false);
            expect(response.body.msg).toBe("Brand is required");
      })

      it("should return status 400 -addBrandHandler ", async () => {
            const response = await request(app).post("/api/v1/admin/cars/brand").send({ "brand": "text21" });
            expect(response.status).toBe(400)
            expect(response.body.status).toBe(false);
            expect(response.body.msg).toBe("brand already exist");
      })









})