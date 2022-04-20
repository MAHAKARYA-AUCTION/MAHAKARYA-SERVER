const app = require("../app");
const request = require("supertest");
const { Admin, Lot, Collection, User } = require("../models");

let access_token;
beforeAll(async () => {
  await User.create({
    username: "sellerauction",
    email: "sellerauction@email.com",
    password: "password",
    ktp: "3333333333333333",
    phoneNumber: "08123456789",
    address: "sellerauction address",
    role: "seller",
  });

  await User.create({
    username: "buyerauction",
    email: "buyerauction@email.com",
    password: "password",
    ktp: "4444444444444444",
    phoneNumber: "08123456789",
    address: "buyerauction address",
    role: "buyer",
    balance: 100000000,
  });

  await Admin.create({
    username: "admintest",
    email: "admintest@email.com",
    password: "12345",
  });

  const response = await request(app).post("/users/login").send({
    email: "buyerauction@email.com",
    password: "password",
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

  await Lot.create({
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

describe("POST /bid/:lotId - FAILED TEST ADD BID", () => {
  it("should return with status 500", async () => {
    const res = await request(app).post("/bid/1").send({
      userId: 2,
      sum: 15500000,
    });

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("msg", "Internal Server Error");
  });
});
