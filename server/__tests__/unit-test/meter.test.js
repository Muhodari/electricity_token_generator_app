const request = require("supertest");
const chai = require("chai");
const http = require("chai-http");

const { expect } = chai;

const { Meter } = require("../../app/models/meter.model");
const app = require("../../app");
const { mongoose } = require("../../app/models");
const { Token } = require("../../app/models/token.model");

chai.use(http);

describe("Meter", () => {
  let updatedMeter = {
    _id: "620e54b02b62091160f66bfd",
    code: "324287",
    owner_first_name: "izabayo1",
    owner_last_name: "Cedric",
  };

  let date = new Date();
  date.setDate(date.getDate() + 20);

  let data = {
    _id: "620e54b02b62091160f66bfd",
    code: "324287",
    power_expiration_time: new Date(date),
    owner_first_name: "eric",
    owner_last_name: "john",
  };

  let token = {
    _id: "620e54b72b62091160f77c00",
    code: "16b69b07-4c9a-436f-9af4-b6c1c97e2d65",
    meter_number: "324287",
    total_amount: 1000,
    status: "available",
  };


  test("get meter by id success", async () => {
    jest.spyOn(Meter, "findOne").mockReturnValue(Promise.resolve(data));
    const res = await chai.request(app).get("/api/meters/324287");
    expect(res.status).to.equal(200);
    await mongoose.disconnect();
  });

  test("Get meter by id 404", async () => {
    jest.spyOn(Meter, "findOne").mockReturnValue(Promise.resolve(undefined));
    const res = await chai.request(app).get("/api/meters/324267");
    expect(res.status).to.equal(404);
  });


  test("create meter should add 10 days of power", async () => {
    jest.spyOn(Meter, "findOne").mockReturnValue(Promise.resolve(data));
    jest.spyOn(Meter, "updateOne").mockReturnValue(Promise.resolve(true));
    jest.spyOn(Token, "findOne").mockReturnValue(Promise.resolve(token));
    jest.spyOn(Token, "findOneAndUpdate").mockReturnValue(Promise.resolve(token));
    const res = await request(app).post("/api/meters/loadToken").send({
        meter_number: "324287",
        token: "16b69b07-4c9a-436f-9af4-b6c1c97e2d65"
      });
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal(`10 days added, now you have 30 days remaining`);
    await mongoose.disconnect();
  });

  

  it("POST /api/meters --> should create meter successfully", async () => {
    jest.spyOn(Meter, "create").mockReturnValue(Promise.resolve(true));

    const res = await request(app).post("/api/meters").send({
      owner_first_name: "eric",
      owner_last_name: "john",
    });

    expect(res.statusCode).to.equal(201);
  });

  it(" should not create meter if owner_first_name is missing", async () => {
    const res = await request(app).post("/api/meters").send({
      owner_last_name: "john",
    });
    expect(res.statusCode).to.equal(400);
    expect(res.body.message).to.equal('"owner_first_name" is required');
  });

  test("update meter success", async () => {
    jest
      .spyOn(Meter, "findOneAndUpdate")
      .mockReturnValue(Promise.resolve(updatedMeter));
    const res = await chai.request(app).put("/api/meters/324287").send({
      owner_first_name: "eric",
      owner_last_name: "john",
    });
    expect(res.body.message).to.equal("Meter was updated successfully.");
  });

  
  test("update meter  404 ", async () => {
    jest
      .spyOn(Meter, "findOneAndUpdate")
      .mockReturnValue(Promise.resolve(null));
    const res = await chai.request(app).put("/api/meters/324287").send({
      owner_first_name: "eric",
      owner_last_name: "john",
    });
    expect(res.body.message).to.equal("Not Found");
  });

 

});