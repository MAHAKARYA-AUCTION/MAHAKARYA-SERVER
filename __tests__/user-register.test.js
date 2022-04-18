const app = require("../app");
const request = require("supertest");
const { User } = require("../models");

afterAll(async () => {
  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("POST /users/register - SUCCESS TEST", () => {
  it("should return with status 201", async () => {
    const res = await request(app).post("/users/register").send({
      username: "usertest",
      email: "usertest@email.com",
      password: "password",
      ktp: "1111111111111111",
      phoneNumber: "08123456789",
      address: "usertest address",
      role: "buyer",
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("username", expect.any(String));
    expect(res.body).toHaveProperty("email", expect.any(String));
    expect(res.body).toHaveProperty("password", expect.any(String));
    expect(res.body).toHaveProperty("ktp", expect.any(String));
    expect(res.body).toHaveProperty("phoneNumber", expect.any(String));
    expect(res.body).toHaveProperty("address", expect.any(String));
    expect(res.body).toHaveProperty("role", expect.any(String));
  });
});

describe("POST /users/register - FAILED TEST EMAIL IS NOT PROVIDED", () => {
  it("should return with status 400", async () => {
    const res = await request(app).post("/users/register").send({
      username: "usertest",
      password: "12345",
      ktp: "1111111111111111",
      phoneNumber: "08123456789",
      address: "usertest address",
      role: "buyer",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Email is required");
  });
});

describe("POST /users/register - FAILED TEST PASSWORD IS NOT PROVIDED", () => {
  it("should return with status 400", async () => {
    const res = await request(app).post("/users/register").send({
      username: "usertest",
      email: "usertest@email.com",
      ktp: "1111111111111111",
      phoneNumber: "08123456789",
      address: "usertest address",
      role: "buyer",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Password is required");
  });
});

describe("POST /users/register - FAILED TEST KTP IS NOT PROVIDED", () => {
  it("should return with status 400", async () => {
    const res = await request(app).post("/users/register").send({
      username: "usertest",
      email: "usertest@email.com",
      password: "password",
      phoneNumber: "08123456789",
      address: "usertest address",
      role: "buyer",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "KTP number is required");
  });
});

describe("POST /users/register - FAILED TEST PHONE NUMBER IS NOT PROVIDED", () => {
  it("should return with status 400", async () => {
    const res = await request(app).post("/users/register").send({
      username: "usertest",
      email: "usertest@email.com",
      password: "password",
      ktp: "1111111111111111",
      address: "usertest address",
      role: "buyer",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Phone number is required");
  });
});

describe("POST /users/register - FAILED TEST ADDRESS IS NOT PROVIDED", () => {
  it("should return with status 400", async () => {
    const res = await request(app).post("/users/register").send({
      username: "usertest",
      email: "usertest@email.com",
      password: "password",
      ktp: "1111111111111111",
      phoneNumber: "08123456789",
      role: "buyer",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Address is required");
  });
});

describe("POST /users/register - FAILED TEST ROLE IS NOT PROVIDED", () => {
  it("should return with status 400", async () => {
    const res = await request(app).post("/users/register").send({
      username: "usertest",
      email: "usertest@email.com",
      password: "password",
      ktp: "1111111111111111",
      phoneNumber: "08123456789",
      address: "usertest address",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Role is required");
  });
});
