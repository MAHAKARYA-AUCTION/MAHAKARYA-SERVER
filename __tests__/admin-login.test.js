const app = require("../app");
const request = require("supertest");
const { Admin } = require("../models");

beforeAll(async () => {
  await Admin.create({
    username: "admintest",
    email: "admintest@email.com",
    password: "password",
  });
});

afterAll(async () => {
  await Admin.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("POST /admins/login - SUCCESS TEST", () => {
  it("should return with status 200", async () => {
    const res = await request(app).post("/admins/login").send({
      email: "admintest@email.com",
      password: "password",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("access_token", expect.any(String));
    expect(res.body).toHaveProperty("admin", expect.any(Object));
    expect(res.body).toHaveProperty("message", "Login success");
  });
});

describe("POST /admins/login - FAIL TEST INCORRECT EMAIL", () => {
  it("should return with status 401", async () => {
    const res = await request(app).post("/admins/login").send({
      email: "wrong@email.com",
      password: "wrong",
    });
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "Invalid email/password");
  });
});

describe("POST /admins/login - FAIL TEST EMAIL NOT PROVIDED", () => {
  it("should return with status 401", async () => {
    const res = await request(app).post("/admins/login").send({
      password: "wrong",
    });
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "Invalid email/password");
  });
});

describe("POST /admins/login - FAIL TEST INCORRECT PASSWORD", () => {
  it("should return with status 401", async () => {
    const res = await request(app).post("/admins/login").send({
      email: "admintest@email.com",
      password: "wrong",
    });
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "Invalid email/password");
  });
});

describe("POST /admins/login - FAIL TEST PASSWORD NOT PROVIDED", () => {
  it("should return with status 401", async () => {
    const res = await request(app).post("/admins/login").send({
      email: "admintest@email.com",
    });
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "Invalid email/password");
  });
});
