const midtransClient = require("midtrans-client");
const { Transaction } = require("../models");
require("dotenv").config();
// const server_key = process.env.SERVER_MIDTRANS;
// const client_key = process.env.CLIENT_MIDTRANS;
// const base64 = require('base-64')

class MidtransController {
  static async topup(req, res, next) {
    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: "SB-Mid-server-1ma6JiKFEciB7nR0KoP5GMH7",
      clientKey: "SB-Mid-client-s6SV0WfrkztKRJyG",
    });
    try {
      const { price, UserId } = req.body;
      let parameter = {
        transaction_details: {
          order_id: `ORDER-ID-${Math.floor(Date.now() / 10)}`,
          gross_amount: price,
        },
        credit_card: {
          secure: true,
        },
      };
      await Transaction.create({
        UserId: UserId,
        transactionNumber: `TRANS-ID-${Math.floor(Date.now() / 10)}`,
        price: price,
        status: "pending",
        type: "topup",
      });
      const result = await snap.createTransaction(parameter);
      res.status(201).json(result);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async callbackMidtrans (req, res, next) {
    try {
      console.log({ body: req.body })
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}

module.exports = MidtransController;
