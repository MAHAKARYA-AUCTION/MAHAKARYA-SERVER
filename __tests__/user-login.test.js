const app = require("../app");
const request = require("supertest");
const { User } = require("../models");

beforeAll(async () => {
  await User.create({
    username: "usertest",
    email: "usertest@email.com",
    password: "password",
    ktp: "1111111111111111",
    phoneNumber: "08123456789",
    address: "usertest address",
    role: "buyer",
  });
});

afterAll(async () => {
  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("POST /users/login - SUCCESS TEST", () => {
  it("should return with status 200", async () => {
    const res = await request(app).post("/users/login").send({
      email: "usertest@email.com",
      password: "password",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("access_token", expect.any(String));
    expect(res.body).toHaveProperty("user", expect.any(Object));
  });
});

describe("POST /users/login - FAIL TEST INCORRECT EMAIL", () => {
  it("should return with status 401", async () => {
    const res = await request(app).post("/users/login").send({
      email: "usertest@email.com",
      password: "wrong",
    });
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "Invalid email/password");
  });
});

describe("POST /users/login - FAIL TEST INCORRECT PASSWORD", () => {
  it("should return with status 401", async () => {
    const res = await request(app).post("/users/login").send({
      email: "usertest@email.com",
      password: "wrong",
    });
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "Invalid email/password");
  });
});
