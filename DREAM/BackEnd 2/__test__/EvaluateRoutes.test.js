const server = require("../app.js");
const supertest = require("supertest");
const requestWithSupertest = supertest(server);

describe("Evaluate Endpoints", () => {
  it("GET /evaluate/getFarmers should return all the farmers", async () => {
    const response = await requestWithSupertest
      .post("/login")
      .send({ email: "123@gmail.com", password: "123" });

    const res = await requestWithSupertest
      .get("/evaluate/getFarmers")
      .set("Authorization", "bearer " + response.body.token);
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("farmers");
  });

  it("GET /evaluate/getSteering should return all the steering initiatives", async () => {
    const response = await requestWithSupertest
      .post("/login")
      .send({ email: "123@gmail.com", password: "123" });

    const res = await requestWithSupertest
      .get("/evaluate/getSteering")
      .set("Authorization", "bearer " + response.body.token);
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("steeringList");
  });

  //farmer inesistente
  it("GET /evaluate/farmerInfo/:farmerID should not allow to request info of a non existent farmer", async function () {
    const farmerID = 999;
    const response = await requestWithSupertest
      .post("/login")
      .send({ email: "123@gmail.com", password: "123" });
    const res = await requestWithSupertest
      .get("/evaluate/farmerInfo/" + farmerID)
      .set("Authorization", "bearer " + response.body.token);
    expect(res.status).toEqual(500);
  });

  //farmer esistente
  it("GET /evaluate/farmerInfo/:farmerID should return the info for the farmer", async function () {
    const farmerID = 1;
    const response = await requestWithSupertest
      .post("/login")
      .send({ email: "123@gmail.com", password: "123" });
    const res = await requestWithSupertest
      .get("/evaluate/farmerInfo/" + farmerID)
      .set("Authorization", "bearer " + response.body.token);
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("farmerInfo");
  });
  //steering inesistente
  it("GET /evaluate/steeringInfo/:initativeID should not allow to request info of a non existent steering initiative", async function () {
    const initativeID = 999;
    const response = await requestWithSupertest
      .post("/login")
      .send({ email: "123@gmail.com", password: "123" });
    const res = await requestWithSupertest
      .get("/evaluate/steeringInfo/" + initativeID)
      .set("Authorization", "bearer " + response.body.token);
    expect(res.status).toEqual(500);
  });

  //steering esistente
  it("GET /evaluate/steeringInfo/:initativeID should return the info for the steering inititative", async function () {
    const initativeID = 1;
    const response = await requestWithSupertest
      .post("/login")
      .send({ email: "123@gmail.com", password: "123" });
    const res = await requestWithSupertest
      .get("/evaluate/steeringInfo/" + initativeID)
      .set("Authorization", "bearer " + response.body.token);
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("steeringInfo");
  });

  //Evaluate initiative that don't exist
  it("POST /evaluate/evaluateSteering should not allow to evaluate a initiative that don't exists", async function () {
    const initativeID = 999;
    const grade = 1;
    const response = await requestWithSupertest
      .post("/login")
      .send({ email: "123@gmail.com", password: "123" });

    const res = await requestWithSupertest
      .post("/evaluate/evaluateSteering/")
      .send({
        initativeID,
        grade,
      })
      .set("Authorization", "bearer " + response.body.token);
    expect(res.status).toEqual(500);
  });
  //Evaluate initiative with a non positive grade
  it("POST /evaluate/evaluateSteering should evaluate steering only positively", async function () {
    const initativeID = 1;
    const grade = 0;
    const response = await requestWithSupertest
      .post("/login")
      .send({ email: "123@gmail.com", password: "123" });

    const res = await requestWithSupertest
      .post("/evaluate/evaluateSteering")
      .send({
        initativeID,
        grade,
      })
      .set("Authorization", "bearer " + response.body.token);
    expect(res.status).toEqual(500);
  });

  it("POST /evaluate/evaluateSteering should allow to evaluate steering", async function () {
    const initativeID = 1;
    const grade = 1;
    const response = await requestWithSupertest
      .post("/login")
      .send({ email: "123@gmail.com", password: "123" });

    const res = await requestWithSupertest
      .post("/evaluate/evaluateSteering")
      .send({
        initativeID,
        grade,
      })
      .set("Authorization", "bearer " + response.body.token);
    expect(res.status).toEqual(200);
  });

  //Evaluate farmer that don't exist
  it("POST /evaluate/evaluateFarmer should not allow to evaluate a farmer that don't exists", async function () {
    const farmerID = 999;
    const grade = 1;
    const response = await requestWithSupertest
      .post("/login")
      .send({ email: "123@gmail.com", password: "123" });

    const res = await requestWithSupertest
      .post("/evaluate/evaluateFarmer/")
      .send({
        farmerID,
        grade,
      })
      .set("Authorization", "bearer " + response.body.token);
    expect(res.status).toEqual(500);
  });
  //Evaluate initiative with a non positive grade
  it("POST /evaluate/evaluateFarmer should evaluate steering only positively or negatively", async function () {
    const farmerID = 1;
    const grade = 3;
    const response = await requestWithSupertest
      .post("/login")
      .send({ email: "123@gmail.com", password: "123" });

    const res = await requestWithSupertest
      .post("/evaluate/evaluateFarmer")
      .send({
        farmerID,
        grade,
      })
      .set("Authorization", "bearer " + response.body.token);
    expect(res.status).toEqual(500);
  });

  it("POST /evaluate/evaluateFarmer should allow to evaluate steering", async function () {
    const farmerID = 1;
    const grade = 1;
    const response = await requestWithSupertest
      .post("/login")
      .send({ email: "123@gmail.com", password: "123" });

    const res = await requestWithSupertest
      .post("/evaluate/evaluateFarmer")
      .send({
        farmerID,
        grade,
      })
      .set("Authorization", "bearer " + response.body.token);
    expect(res.status).toEqual(200);
  });
});
