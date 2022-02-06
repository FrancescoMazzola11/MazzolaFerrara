const server = require("../app.js");
const supertest = require("supertest");
const SteeringInitative = require("../models/SteeringInitative.js");
const requestWithSupertest = supertest(server);

describe("Steering Endpoints", () => {
 

  it("GET /getBadFarmers should return all the farmers with trend = 0 and no active steering initatives", async () => {
    const response = await requestWithSupertest
      .post("/login")
      .send({ email: "123@gmail.com", password: "123" });

    const res = await requestWithSupertest
      .get("/steering/getBadFarmers")
      .set("Authorization", "bearer " + response.body.token);
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("badFarmers");
  });

  it("GET /getAgronomists should return all the agronomists", async () => {
    const response = await requestWithSupertest
      .post("/login")
      .send({ email: "123@gmail.com", password: "123" });

    const res = await requestWithSupertest
      .get("/steering/getAgronomists")
      .set("Authorization", "bearer " + response.body.token);
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("agronomists");
  });

  //farmer non esistente
  it("GET /createSteering should not allow not existing farmer", async function () {
    const farmerID = 999;
    const agronomistID = 1;
    const response = await requestWithSupertest
      .post("/login")
      .send({ email: "123@gmail.com", password: "123" });
    const res = await requestWithSupertest
      .post("/steering/createSteering")
      .set("Authorization", "bearer " + response.body.token)
      .send({
        farmerID: farmerID,
        agronomistID: agronomistID,
      });
    expect(res.status).toEqual(500);
  });
  //agronomist non esistente
  it("GET /createSteering should not allow not existing agronomist", async function () {
    const farmerID = 1;
    const agronomistID = 999;
    const response = await requestWithSupertest
      .post("/login")
      .send({ email: "123@gmail.com", password: "123" });

    const res = await requestWithSupertest
      .post("/steering/createSteering")
      .set("Authorization", "bearer " + response.body.token)
      .send({
        farmerID: farmerID,
        agronomistID: agronomistID,
      });
    expect(res.status).toEqual(500);
  });

  //farmer già in una steering
  it("GET /createSteering should not allow to have a farmer in more then one steering initative", async function () {
    const farmerID = 1;
    const agronomistID = 1;
    const response = await requestWithSupertest
      .post("/login")
      .send({ email: "123@gmail.com", password: "123" });

    const res = await requestWithSupertest
      .post("/steering/createSteering")
      .set("Authorization", "bearer " + response.body.token)
      .send({
        farmerID: farmerID,
        agronomistID: agronomistID,
      });
    expect(res.status).toEqual(500);
  });

  it("GET /createSteering should create a new steering initative", async () => {
    const farmerID = 3;
    const agronomistID = 1;
    const response = await requestWithSupertest
      .post("/login")
      .send({ email: "123@gmail.com", password: "123" });

    const res = await requestWithSupertest
      .post("/steering/createSteering")
      .set("Authorization", "bearer " + response.body.token)
      .send({
        farmerID: farmerID,
        agronomistID: agronomistID,
      });
    expect(res.status).toEqual(201);
    expect(res.type).toEqual(expect.stringContaining("json"));
    console.log(res.body);
    await SteeringInitative.destroy({
      where: {
        initativeID: res.body.si.initativeID,
      },
    });
  });
});
