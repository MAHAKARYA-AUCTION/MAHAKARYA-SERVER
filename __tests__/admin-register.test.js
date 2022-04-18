const app = require("../app");
const request = require("supertest");
const { Admin } = require("../models");

afterAll(async () => {
  await Admin.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("POST /admins/register - SUCCESS TEST", () => {
  it("should return with status 201", async () => {
    const res = await request(app).post("/admins/register").send({
      username: "admintest",
      email: "admintest@email.com",
      password: "password",
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("username", expect.any(String));
    expect(res.body).toHaveProperty("email", expect.any(String));
    expect(res.body).toHaveProperty("password", expect.any(String));
  });
});

describe("POST /admins/register - FAILED TEST EMAIL IS NOT PROVIDED", () => {
  it("should return with status 400", async () => {
    const res = await request(app).post("/admins/register").send({
      username: "admintest",
      password: "password",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Email is required");
  });
});

describe("POST /admins/register - FAILED TEST PASSWORD IS NOT PROVIDED", () => {
  it("should return with status 400", async () => {
    const res = await request(app).post("/admins/register").send({
      username: "admintest",
      email: "admintest@email.com",
    });
    console.log(res.body);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Password is required");
  });
});

describe("POST /admins/register - FAILED TEST USERNAME IS NOT PROVIDED", () => {
  it("should return with status 400", async () => {
    const res = await request(app).post("/admins/register").send({
      email: "admintest@email.com",
      password: "password",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Username is required");
  });
});
