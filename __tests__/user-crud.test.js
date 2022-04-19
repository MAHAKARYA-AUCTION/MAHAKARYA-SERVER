const app = require("../app");
const request = require("supertest");
const { User } = require("../models");

let access_token;
beforeAll(async () => {
  await User.create({
    username: "usertest",
    email: "usertest@email.com",
    password: "12345",
    ktp: "1111111111111111",
    phoneNumber: "08123456789",
    address: "usertest address",
    role: "buyer",
  });

  const response = await request(app).post("/users/login").send({
    email: "usertest@email.com",
    password: "12345",
  });
  access_token = response.body.access_token;
});

afterAll(async () => {
  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("GET /users/:id - SUCCESS TEST GET USER BY ID", () => {
  it("should return with status 200", async () => {
    const res = await request(app).get("/users/1").set("access_token", access_token);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
    expect(res.body).toHaveProperty("username", "usertest");
    expect(res.body).toHaveProperty("email", "usertest@email.com");
    expect(res.body).toHaveProperty("ktp", "1111111111111111");
    expect(res.body).toHaveProperty("phoneNumber", "08123456789");
    expect(res.body).toHaveProperty("address", "usertest address");
    expect(res.body).toHaveProperty("role", "buyer");
    expect(res.body).toHaveProperty("balance", 0);
    expect(res.body).toHaveProperty("balanceSpent", 0);
  });
});

describe("GET /users/:id - FAILED TEST GET USER BY ID NOT FOUND", () => {
  it("should return with status 200", async () => {
    const res = await request(app).get("/users/100").set("access_token", access_token);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Data not found");
  });
});

describe("PUT /users/:id - SUCCESS TEST UPDATE USER BY ID", () => {
  it("should return with status 200", async () => {
    const res = await request(app)
      .put("/users/1")
      .send({
        username: "usertest",
        email: "usertest@email.com",
        password: "12345",
        ktp: "1111111111111111",
        phoneNumber: "08123456789",
        address: "usertest address",
        role: "buyer",
      })
      .set("access_token", access_token);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Update success");
  });
});

describe("PUT /users/:id - FAILED TEST UPDATE USER BY ID USER NOT FOUND", () => {
  it("should return with status 400", async () => {
    const res = await request(app).put("/users/100").send({}).set("access_token", access_token);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Data not found");
  });
});

describe("PUT /users/:id - FAILED TEST UPDATE USER BY ID WRONG ACCESS TOKEN", () => {
  it("should return with status 401", async () => {
    const res = await request(app).put("/users/100").send({}).set("access_token", "randomtoken");

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "Invalid token");
  });
});

describe("DELETE /users/:id - FAILED TEST DELETE USER BY ID NOT FOUND", () => {
  it("should return with status 404", async () => {
    const res = await request(app).delete("/users/1000").set("access_token", access_token);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Data not found");
  });
});

describe("DELETE /users/:id - SUCCESS TEST DELETE USER BY ID", () => {
  it("should return with status 200", async () => {
    const res = await request(app).delete("/users/1").set("access_token", access_token);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Delete success");
  });
});
