const app = require("../app");
const request = require("supertest");
const { Admin, Lot, Collection, User } = require("../models");
// const lots = require("../data/lots.json");
const collections = require("../data/collections.json");

beforeAll(async () => {
  await Admin.create({
    username: "admintest",
    email: "admintest@email.com",
    password: "12345",
  });

  await User.create({
    username: "usertestlot1",
    email: "usertestlot1@email.com",
    password: "password",
    ktp: "1111111222111111",
    phoneNumber: "08123456789",
    address: "usertestlot1 address",
    role: "seller",
  });

  await Collection.bulkCreate(collections);

  await Lot.create({
    name: "La familia de Carlos IV",
    description: "Aparecen Goya, los infantes Carlos María Isidro, Francisco de Paula, Carlota Joaquina, María Josefa, María Luisa, Gabriel Antonio, Carlos Luis. También se observa a Luis de Etruria, esposo de María Luisa. Ésta carga en brazos a su hijo Carlos Luis. Otras figuras son los reyes Carlos IV y María Luisa de Parma, el príncipe Fernando y su esposa María Antonieta.",
    width: 336,
    height: 280,
    size: "336 x 280 cm",
    startingBid: 10000000,
    SellerId: 1,
    CollectionId: 1,
    primaryImage: "https://res.cloudinary.com/mahakarya/image/upload/v1650263196/paintings/1-1-1_f8ueab.jpg",
    secondImage: "https://res.cloudinary.com/mahakarya/image/upload/v1650263199/paintings/1-1-2_z4yy3a.jpg",
    thirdImage: "https://res.cloudinary.com/mahakarya/image/upload/v1650263185/paintings/1-1-4_bpwjsz.jpg",
    artistName: "Francisco de Goya",
    lotNumber: 1,
  });
});

afterAll(async () => {
  await Lot.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await Collection.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await Admin.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("GET /lots - SUCCESS TEST FETCH ALL LOTS", () => {
  it("should return with status 200", async () => {
    const res = await request(app).get("/lots");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining([expect.any(Object)]));
  });
});

describe("GET /lots - SUCCESS TEST FETCH LOT BY ID", () => {
  it("should return with status 200", async () => {
    const res = await request(app).get("/lots/1");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", expect.any(Number));
    expect(res.body).toHaveProperty("name", expect.any(String));
    expect(res.body).toHaveProperty("description", expect.any(String));
    expect(res.body).toHaveProperty("width", expect.any(Number));
    expect(res.body).toHaveProperty("height", expect.any(Number));
    expect(res.body).toHaveProperty("size", expect.any(String));
    expect(res.body).toHaveProperty("startingBid", expect.any(Number));
    expect(res.body).toHaveProperty("primaryImage", expect.any(String));
    expect(res.body).toHaveProperty("artistName", expect.any(String));
    expect(res.body).toHaveProperty("SellerId", expect.any(Number));
    expect(res.body).toHaveProperty("User", expect.any(Object));
    expect(res.body).toHaveProperty("CollectionId", expect.any(Number));
    expect(res.body).toHaveProperty("Collection", expect.any(Object));
  });
});

describe("GET /lots - FAILED TEST FETCH LOT BY ID LOT NOT FOUND", () => {
  it("should return with status 200", async () => {
    const res = await request(app).get("/lots/10");

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Data not found");
  });
});
