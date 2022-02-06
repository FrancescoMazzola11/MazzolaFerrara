const server = require("../app.js");
const supertest = require("supertest");
const requestWithSupertest = supertest(server);

describe("Account Endpoints", () => {
  //Not existing email
  it("POST /login should not allow to login with not existing email", async () => {
    const res = await requestWithSupertest
      .post("/login")
      .send({ email: "456@gmail.com", password: "123" });
    expect(res.status).toEqual(403);
  });
  //Wrong password
  it("POST /login should not allow to login with wrong password", async () => {
    const res = await requestWithSupertest
      .post("/login")
      .send({ email: "123@gmail.com", password: "456" });
    expect(res.status).toEqual(403);
  });

  it("POST /login should allow to login and retrive token and info of the policy maker", async () => {
    const res = await requestWithSupertest
      .post("/login")
      .send({ email: "123@gmail.com", password: "123" });
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("email");
    expect(res.body).toHaveProperty("token");
  });
});
