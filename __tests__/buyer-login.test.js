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
    role: "seller",
  });
});

afterAll(async () => {
  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("POST /users/login - FAILED TEST LOGIN AS SELLER", () => {
  it("should return with status 403", async () => {
    const res = await request(app).post("/users/login").send({
      email: "usertest@email.com",
      password: "password",
    });
    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty("message", "You are not authorized");
  });
});
