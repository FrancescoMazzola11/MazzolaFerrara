const server = require("../app.js");
const supertest = require("supertest");
const requestWithSupertest = supertest(server);

describe("Middleware testing", () => {
  //Testing auth in SteeringRoutes
  it("GET /steering/getBadFarmers should require authentication", async function () {
    const res = await requestWithSupertest.get("/steering/getBadFarmers");
    expect(res.status).toEqual(403);
  });

  it("GET /steering/getAgronomists should require authentication", async function () {
    const res = await requestWithSupertest.get("/steering/getAgronomists");
    expect(res.status).toEqual(403);
  });

  it("GET /steering/createSteering should require authentication", async function () {
    const farmerID = 3;
    const agronomistID = 1;
    const res = await requestWithSupertest
      .post("/steering/createSteering")
      .send({
        farmerID: farmerID,
        agronomistID: agronomistID,
      });
    expect(res.status).toEqual(403);
  });

  //Testing auth in EvaluateRoutes

  it("GET /evaluate/getFarmers should require authentication", async function () {
    const res = await requestWithSupertest.get("/evaluate/getFarmers");
    expect(res.status).toEqual(403);
  });

  it("GET /evaluate/farmerInfo/:farmerID should require authentication", async function () {
    const farmerID = 1;
    const res = await requestWithSupertest.get(
      "/evaluate/farmerInfo/" + farmerID
    );
    expect(res.status).toEqual(403);
  });

  it("GET /evaluate/getSteering should require authentication", async function () {
    const res = await requestWithSupertest.get("/evaluate/getSteering");
    expect(res.status).toEqual(403);
  });

  it("GET /evaluate/steeringInfo/:initativeID should require authentication", async function () {
    const initativeID = 1;
    const res = await requestWithSupertest.get(
      "/evaluate/steeringInfo/" + initativeID
    );
    expect(res.status).toEqual(403);
  });

  it("GET /evaluate/evaluateFarmer should require authentication", async function () {
    const farmerID = 1;
    const grade = 1;
    const res = await requestWithSupertest
      .post("/evaluate/evaluateFarmer")
      .send({ farmerID, grade });
    expect(res.status).toEqual(403);
  });

  it("GET /evaluate/evaluateSteering should require authentication", async function () {
    const initativeID = 1;
    const grade = 0;
    const res = await requestWithSupertest
      .post("/evaluate/evaluateSteering")
      .send({ initativeID, grade });
    expect(res.status).toEqual(403);
  });
});
