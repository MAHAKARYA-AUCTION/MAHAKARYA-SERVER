const app = require("../app");
const request = require("supertest");
const { Admin, Lot, Collection, User } = require("../models");

let access_token;
beforeAll(async () => {
  await User.create({
    username: "usertestlot1",
    email: "usertestlot1@email.com",
    password: "password",
    ktp: "1111111222111111",
    phoneNumber: "08123456789",
    address: "usertestlot1 address",
    role: "seller",
  });

  await Admin.create({
    username: "admintest",
    email: "admintest@email.com",
    password: "12345",
  });

  const response = await request(app).post("/admins/login").send({
    email: "admintest@email.com",
    password: "12345",
  });
  access_token = response.body.access_token;

  await Collection.create({
    name: "Realism",
    imgUrl: "https://res.cloudinary.com/mahakarya/image/upload/v1650263195/paintings/collection-1_z7bs82.jpg",
    description: "Realism in the arts is generally the attempt to represent subject matter truthfully, without artificiality and avoiding speculative fiction and supernatural elements. The term is often used interchangeably with naturalism, even though these terms are not synonymous.",
    startDate: "2022-04-15T02:00:00.000Z",
    endDate: "2022-04-23T14:00:00.000Z",
    galleryName: "goliath-gallery",
    AdminId: 1,
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

describe("POST /lots - SUCCESS TEST ADD LOT", () => {
  it("should return with status 201", async () => {
    const res = await request(app)
      .post("/lots")
      .send({
        name: "Butcher's Shop",
        description: "Annibale Carracci - Butcher's Shop (1560-1609)",
        width: 271,
        height: 190,
        size: "271 x 190 cm",
        startingBid: 15000000,
        SellerId: 1,
        CollectionId: 1,
        primaryImage: "https://res.cloudinary.com/mahakarya/image/upload/v1650263186/paintings/1-2-1_pavtui.jpg",
        secondImage: "https://res.cloudinary.com/mahakarya/image/upload/v1650263186/paintings/1-2-2_jax2g6.jpg",
        thirdImage: "https://res.cloudinary.com/mahakarya/image/upload/v1650263185/paintings/1-2-3_mfc4sa.jpg",
        artistName: "Annibale Carracci",
        lotNumber: 1,
      })
      .set("access_token", access_token);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id", 1);
    expect(res.body).toHaveProperty("name", "Butcher's Shop");
    expect(res.body).toHaveProperty("description", "Annibale Carracci - Butcher's Shop (1560-1609)");
    expect(res.body).toHaveProperty("width", 271);
    expect(res.body).toHaveProperty("height", 190);
    expect(res.body).toHaveProperty("size", "271 x 190 cm");
    expect(res.body).toHaveProperty("startingBid", 15000000);
    expect(res.body).toHaveProperty("primaryImage", "https://res.cloudinary.com/mahakarya/image/upload/v1650263186/paintings/1-2-1_pavtui.jpg");
    expect(res.body).toHaveProperty("secondImage", "https://res.cloudinary.com/mahakarya/image/upload/v1650263186/paintings/1-2-2_jax2g6.jpg");
    expect(res.body).toHaveProperty("thirdImage", "https://res.cloudinary.com/mahakarya/image/upload/v1650263185/paintings/1-2-3_mfc4sa.jpg");
    expect(res.body).toHaveProperty("artistName", "Annibale Carracci");
    expect(res.body).toHaveProperty("CollectionId", 1);
    expect(res.body).toHaveProperty("SellerId", 1);
    expect(res.body).toHaveProperty("lotNumber", 1);
  });
});

describe("POST /lots - FAILED TEST ADD LOT NAME IS NOT PROVIDED", () => {
  it("should return with status 400", async () => {
    const res = await request(app)
      .post("/lots")
      .send({
        description: "Annibale Carracci - Butcher's Shop (1560-1609)",
        width: 271,
        height: 190,
        size: "271 x 190 cm",
        startingBid: 15000000,
        SellerId: 1,
        CollectionId: 1,
        primaryImage: "https://res.cloudinary.com/mahakarya/image/upload/v1650263186/paintings/1-2-1_pavtui.jpg",
        secondImage: "https://res.cloudinary.com/mahakarya/image/upload/v1650263186/paintings/1-2-2_jax2g6.jpg",
        thirdImage: "https://res.cloudinary.com/mahakarya/image/upload/v1650263185/paintings/1-2-3_mfc4sa.jpg",
        artistName: "Annibale Carracci",
        lotNumber: 1,
      })
      .set("access_token", access_token);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Name is required");
  });
});

describe("POST /lots - FAILED TEST ADD ACCESS TOKEN UNDEFINED", () => {
  it("should return with status 400", async () => {
    const res = await request(app)
      .post("/lots")
      .send({
        description: "Annibale Carracci - Butcher's Shop (1560-1609)",
        width: 271,
        height: 190,
        size: "271 x 190 cm",
        startingBid: 15000000,
        SellerId: 1,
        CollectionId: 1,
        primaryImage: "https://res.cloudinary.com/mahakarya/image/upload/v1650263186/paintings/1-2-1_pavtui.jpg",
        secondImage: "https://res.cloudinary.com/mahakarya/image/upload/v1650263186/paintings/1-2-2_jax2g6.jpg",
        thirdImage: "https://res.cloudinary.com/mahakarya/image/upload/v1650263185/paintings/1-2-3_mfc4sa.jpg",
        artistName: "Annibale Carracci",
        lotNumber: 1,
      })
      .set("access_token", "randomaccesstoken");

    console.log(res.body, "ini errornya");
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "Invalid token");
  });
});

describe("GET /lots - SUCCESS TEST FETCH ALL LOTS", () => {
  it("should return with status 200", async () => {
    const res = await request(app).get("/lots");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining([expect.any(Object)]));
  });
});

describe("GET /lots - SUCCESS TEST FETCH ALL LOTS WITH STARTING BID QUERY ASC", () => {
  it("should return with status 200", async () => {
    const res = await request(app).get("/lots?startingBid=ASC");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining([expect.any(Object)]));
  });
});

describe("GET /lots - SUCCESS TEST FETCH ALL LOTS WITH STARTING BID QUERY DESC", () => {
  it("should return with status 200", async () => {
    const res = await request(app).get("/lots?startingBid=DESC");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining([expect.any(Object)]));
  });
});

describe("GET /lots - SUCCESS TEST FETCH LOTS BY COLLECTION ID", () => {
  it("should return with status 200", async () => {
    const res = await request(app).get("/lots/collections/1");

    console.log(res.body, "RES BODY NIH");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining([expect.any(Object)]));
  });
});

describe("GET /lots - SUCCESS TEST FETCH LOTS BY COLLECTION ID WITH STARTING BID QUERY ASC", () => {
  it("should return with status 200", async () => {
    const res = await request(app).get("/lots/collections/1?startingBid=ASC");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining([expect.any(Object)]));
  });
});

describe("GET /lots - SUCCESS TEST FETCH LOTS BY COLLECTION ID WITH STARTING BID QUERY DESC", () => {
  it("should return with status 200", async () => {
    const res = await request(app).get("/lots/collections/1?startingBid=DESC");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining([expect.any(Object)]));
  });
});

describe("GET /lots - SUCCESS TEST FETCH LOT BY ID", () => {
  it("should return with status 200", async () => {
    const res = await request(app).get("/lots/1");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
    expect(res.body).toHaveProperty("name", "Butcher's Shop");
    expect(res.body).toHaveProperty("description", "Annibale Carracci - Butcher's Shop (1560-1609)");
    expect(res.body).toHaveProperty("width", 271);
    expect(res.body).toHaveProperty("height", 190);
    expect(res.body).toHaveProperty("size", "271 x 190 cm");
    expect(res.body).toHaveProperty("startingBid", 15000000);
    expect(res.body).toHaveProperty("primaryImage", "https://res.cloudinary.com/mahakarya/image/upload/v1650263186/paintings/1-2-1_pavtui.jpg");
    expect(res.body).toHaveProperty("secondImage", "https://res.cloudinary.com/mahakarya/image/upload/v1650263186/paintings/1-2-2_jax2g6.jpg");
    expect(res.body).toHaveProperty("thirdImage", "https://res.cloudinary.com/mahakarya/image/upload/v1650263185/paintings/1-2-3_mfc4sa.jpg");
    expect(res.body).toHaveProperty("artistName", "Annibale Carracci");
    expect(res.body).toHaveProperty("CollectionId", 1);
    expect(res.body).toHaveProperty("Collection", expect.any(Object));
    expect(res.body).toHaveProperty("SellerId", 1);
    expect(res.body).toHaveProperty("User", expect.any(Object));
    expect(res.body).toHaveProperty("lotNumber", 1);
  });
});

describe("GET /lots - FAILED TEST FETCH LOT BY ID NOT FOUND", () => {
  it("should return with status 200", async () => {
    const res = await request(app).get("/lots/10");

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Data not found");
  });
});

describe("GET /lots/collections/:CollectionId - FAILED TEST FETCH LOT BY COLLECTION ID NOT FOUND", () => {
  it("should return with status 200", async () => {
    const res = await request(app).get("/lots/collections/10");

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Collection not found");
  });
});

describe("PUT /lots - SUCCESS TEST ADD LOT", () => {
  it("should return with status 200", async () => {
    const res = await request(app)
      .put("/lots/1")
      .send({
        name: "Butcher's Shop",
        description: "Annibale Carracci - Butcher's Shop (1560-1609)",
        width: 271,
        height: 190,
        size: "271 x 190 cm",
        startingBid: 15000000,
        primaryImage: "https://res.cloudinary.com/mahakarya/image/upload/v1650263186/paintings/1-2-1_pavtui.jpg",
        secondImage: "https://res.cloudinary.com/mahakarya/image/upload/v1650263186/paintings/1-2-2_jax2g6.jpg",
        thirdImage: "https://res.cloudinary.com/mahakarya/image/upload/v1650263185/paintings/1-2-3_mfc4sa.jpg",
        artistName: "Annibale Carracci",
      })
      .set("access_token", access_token);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Update success");
  });
});

describe("DELETE /lots - SUCCESS TEST DELETE LOT BY ID", () => {
  it("should return with status 200", async () => {
    const res = await request(app).delete("/lots/1").set("access_token", access_token);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Delete success");
  });
});

describe("DELETE /lots - FAILED TEST DELETE LOT BY ID NOT FOUND", () => {
  it("should return with status 404", async () => {
    const res = await request(app).delete("/lots/1000").set("access_token", access_token);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Data not found");
  });
});
