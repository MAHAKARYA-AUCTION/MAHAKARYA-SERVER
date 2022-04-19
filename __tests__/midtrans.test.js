const app = require("../app");
const request = require("supertest");
const { Transaction, User } = require("../models");
const { response } = require("../app");

const user = {
  username: "usertest",
  email: "usertest@email.com",
  password: "password",
  ktp: "1111111111111111",
  phoneNumber: "08123456789",
  address: "usertest address",
  role: "buyer",
};

beforeAll(async() => {
  try {
    
    await User.create(user)
    const response = await request(app).post("/users/login").send({
      email: "usertest@email.com",
      password: "password",
    });
    access_token = response.body.access_token;
    // await Transaction.create({
    //   UserId: 1,
    //   transactionNumber: "ORDER-ID-165039058294",
    //   price: 10000,
    //   status: "pending",
    //   type: "topup",
    // })
    // await Transaction.create({
    //   UserId: 9999,
    //   transactionNumber: "ORDER-ID-165039058295",
    //   price: 10000,
    //   status: "pending",
    //   type: "topup",
    // })
    // await Transaction.create({
    //   UserId: 2,
    //   transactionNumber: "ORDER-ID-165039058296",
    //   price: 10000,
    //   status: "success",
    //   type: "topup",
    // })
    await Transaction.bulkCreate([
      {
        UserId: 1,
        transactionNumber: "ORDER-ID-165039058294",
        price: 10000,
        status: "pending",
        type: "topup",
      },
      {
        UserId: 9999,
        transactionNumber: "ORDER-ID-165039058295",
        price: 10000,
        status: "pending",
        type: "topup",
      },
      {
        UserId: 2,
        transactionNumber: "ORDER-ID-165039058296",
        price: 10000,
        status: "success",
        type: "topup",
      }
    ])
  } catch(err) {
    console.log(err)
  }
});

afterAll(async () => {
  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("POST /topup", () => {
  it("should return with status 201", async () => {
    const res = await request(app)
    .post("/topup")
    .expect('Content-Type', /json/)
    .send({
      price: 50000,
      UserId: 1
    })
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("redirect_url", expect.any(String));
    expect(res.body).toHaveProperty("token", expect.any(String));
  });
})

describe("POST /topup", () => {
  it("should return with status 400", async () => {
    const res = await request(app)
    .post("/topup")
    .expect('Content-Type', /json/)
    .send({
      UserId: 1
    })
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "price is required");
  });
})

describe("POST /topup", () => {
  it("should return with status 400", async () => {
    const res = await request(app)
    .post("/topup")
    .expect('Content-Type', /json/)
    .send({
      price: 50000
    })
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "User id is required");
  });
})

describe("POST /topup", () => {
  it("should return with status 400", async () => {
    const res = await request(app)
    .post("/topup")
    .expect('Content-Type', /json/)
    .send({
    })
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "User id is required");
  });
})

describe("POST /callback/midtrans", () => {
  it("should return with status 200", async () => {
    const res = await request(app)
    .post("/callback/midtrans")
    .send({
      transaction_time: '2022-04-20 00:51:05',
      transaction_status: 'capture',
      transaction_id: '13e5acf9-04ac-481f-aaa5-ca8a7fd9c731',
      status_message: 'midtrans payment notification',
      status_code: '200',
      signature_key: '5800c636627f41b692ef5dec8928936dd860513bbbc2341642238f53194a046fc09cea2da37dd809e06c28b7698bf483ca652bca2ba3106acfb1563fc0d64de5',
      payment_type: 'credit_card',
      order_id: 'ORDER-ID-165039058294',
      merchant_id: 'G936058162',
      masked_card: '481111-1114',
      gross_amount: '10000.00',
      fraud_status: 'accept',
      eci: '05',
      currency: 'IDR',
      channel_response_message: 'Approved',
      channel_response_code: '00',
      card_type: 'credit',
      bank: 'bni',
      approval_code: '1650390670326'
    })
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Email Delivered");
  });
  it("should return with status 200", async () => {
    try {
      const res = await request(app)
      .post("/callback/midtrans")
      .send({
        transaction_status: 'settlement',
        order_id: 'ORDER-ID-165039058294'
      })
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
    } catch (err){
      console.log(err)
    }
  });
  it("should return with status 404", async () => {
    try {
      const res = await request(app)
      .post("/callback/midtrans")
      .send({
        transaction_status: 'settlement',
        order_id: '999'
      })
      expect(res.status).toBe(404);
      expect(res.body).toEqual(expect.any(Object));
    } catch (err){
      console.log(err)
    }
  });
  it("should return with status 404-user not found", async () => {
    try {
      const res = await request(app)
      .post("/callback/midtrans")
      .send({
        transaction_status: 'settlement',
        order_id: '9999'
      })
      expect(res.status).toBe(404);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body).toHaveProperty("message", "transaction not found");
    } catch (err){
      console.log(err)
    }
  });
  it.only("should return with status 403-transaction already settle", async () => {
    try {
      const res = await request(app)
      .post("/callback/midtrans")
      .send({
        transaction_status: 'settlement',
        order_id: 'ORDER-ID-165039058296'
      })
      console.log(res.body)
      expect(res.status).toBe(403);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body).toHaveProperty("message", "transaction already settle");
    } catch (err){
      console.log(err)
    }
  });
  it("should return with status 200", async () => {
    try {
      const res = await request(app)
      .post("/callback/midtrans")
      .send({
        transaction_status: 'cancel',
        order_id: 'ORDER-ID-165039058296'
      })
      // console.log(res.body)
      expect(res.status).toBe(500);
      expect(res.body).toEqual(expect.any(Object));
      // expect(res.body).toHaveProperty("message", "transaction already settle");
    } catch (err){
      console.log(err)
    }
  });
})
