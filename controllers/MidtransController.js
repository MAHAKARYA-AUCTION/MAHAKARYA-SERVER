const midtransClient = require("midtrans-client");
const { Transaction, User } = require("../models");
require("dotenv").config();
const nodemailer = require('nodemailer')
const formatRupiah = require('../helpers/formatPrice')
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
    let transaction_id = `ORDER-ID-${Math.floor(Date.now() / 10)}`;
    try {
      const { price, UserId } = req.body;
      let parameter = {
        transaction_details: {
          order_id: transaction_id,
          gross_amount: price,
        },
        credit_card: {
          secure: true,
        },
      };
      await Transaction.create({
        UserId: UserId,
        transactionNumber: transaction_id,
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
  static async callbackMidtrans(req, res, next) {
    try {
      console.log({ body: req.body });
      const { transaction_status, order_id } = req.body;
      if (transaction_status === "settlement") {
        let transaction = await Transaction.findOne({
          where: {
            transactionNumber: order_id,
          },
        });
        if (!transaction) {
          throw new Error("transaction not found");
        }
        if (transaction.status === "success") {
          throw new Error("transaction already settle");
        }
        const user = await User.findOne({ where: { id: transaction.UserId } });
        if (!user) {
          throw new Error("cant find user");
        }
        await user.update({ balance: user.balance + transaction.price });
        await transaction.update({ status: "success" });
        
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth:{
            user: 'mahakaryaauction@gmail.com',
            pass: 'finalprojectp3!',
          }
        })

        const options = {
          from: 'mahakaryaauction@gmail.com',
          to: `${user.email}`,
          subject: `Topup Balance Success!!!`,
          text: `pelanggan ${user.username} telah berhasil topup seharga ${formatRupiah(transaction.price)} dengan nomor transaksi ${order_id}`
        }
        
        transporter.sendMail(options, function(err, info) {
          if(err){
            console.log(err);
            return;
          }
          console.log("sent: "+ info.response);
        })

      } else if (
        transaction_status === "cancel" ||
        transaction_status === "expire"
      ) {
        let transaction = await Transaction.findOne({
          where: {
            transactionNumber: order_id,
          },
        });
        if (!transaction) {
          throw new Error("transaction not found");
        }
        await transaction.update({ status: "failed" });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = MidtransController;
