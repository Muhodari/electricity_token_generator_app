const request = require("supertest");
const chai = require("chai");
const http = require("chai-http");

const { expect } = chai;

const { Meter } = require("../../app/models/meter.model");
const app = require("../../app");
const { mongoose } = require("../../app/models");
const { Token } = require("../../app/models/token.model");

chai.use(http);


describe("Token endpoint", () => {
  let date = new Date();
  date.setDate(date.getDate() + 20);

  let meter = {
    _id: "620e54b02b62091160f66bfd",
    code: "324287",
    power_expiration_time: new Date(date),
    owner_first_name: "eric",
    owner_last_name: "john",
  };

  let data = {
    _id: "620e54b72b62091160f77c00",
    code: "16b69b07-4c9a-436f-9af4-b6c1c97e2d65",
    meter_number: "324287",
    total_amount: 1000,
    status: "available",
  };


  test("Get token by id should return success", async () => {
    jest.spyOn(Token, "findOne").mockReturnValue(Promise.resolve(data));
    const res = await chai.request(app).get("/api/token/16b69b07-4c9a-436f-9af4-b6c1c97e2d65");
    expect(res.status).to.equal(200);
    await mongoose.disconnect();
  });


  test("Get token by id not found should return 404", async () => {
    jest.spyOn(Token, "findOne").mockReturnValue(Promise.resolve(undefined));
    const res = await chai.request(app).get("/api/token/16b68b07-4c9a-436f-9af4-b6c1c97e2d65");
    expect(res.status).to.equal(404);
  });

  it("create token successfully", async () => {
    jest.spyOn(Token, "create").mockReturnValue(Promise.resolve(true));
    jest.spyOn(Meter, "findOne").mockReturnValue(Promise.resolve(meter));

    const res = await request(app).post("/api/token").send({
      meter_number: "324287",
      total_amount: 1000,
    });

    expect(res.statusCode).to.equal(201);
  });


  it("create token Not succed", async () => {
    const res = await request(app).post("/api/token").send({
      meter_number: "324287"
    });
    expect(res.statusCode).to.equal(400);
    expect(res.body.message).to.equal('"total_amount" is required');
  });
});