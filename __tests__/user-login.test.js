const app = require("../app");
const request = require("supertest");
const { User } = require("../models");

let access_token;
beforeAll(async () => {
  await User.create(
    {
      id: 1,
      username: "usertest",
      email: "usertest@email.com",
      password: "password",
      ktp: "1111111111111111",
      phoneNumber: "08123456789",
      address: "usertest address",
      role: "buyer",
    },
  );
  const response = await request(app).post("/users/login").send({
    email: "usertest@email.com",
    password: "password",
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

describe("POST /users/login - FAIL TEST REQ BODY", () => {
  it("should return with status 401", async () => {
    const res = await request(app).post("/users/login").send({
      email: "usertest@email.com",
    });
    expect(res.status).toBe(401);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body).toHaveProperty("message", "Invalid email/password");
  });
  it("should return with status 401", async () => {
    const res = await request(app).post("/users/login").send({
      password: "wrong",
    });
    expect(res.status).toBe(401);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body).toHaveProperty("message", "Invalid email/password");
  });
  it("should return with status 401", async () => {
    const res = await request(app).post("/users/login").send({
      password: "wrong",
      email: "errortest@email.com",
    });
    expect(res.status).toBe(401);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body).toHaveProperty("message", "Invalid email/password");
  });
});

describe("POST /users/:id - UPDATE SUCCESS", () => {
  it("should return with status 200", async () => {
    const res = await request(app)
      .put("/users/1")
      .set("access_token", access_token)
      .send({
        email: "usertest@email.com",
        username: "usertest",
        phoneNumber: "081218293201",
        address: "jl.testing",
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Update success");
  });
});

describe("GET / - APP GET", () => {
  it("should return with status 200", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Mahakarya Server is Running");
  });
});
