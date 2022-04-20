const midtransClient = require("midtrans-client");
const { Transaction, User } = require("../models");
require("dotenv").config();
const nodemailer = require('nodemailer')
const formatRupiah = require('../helpers/formatPrice')
const { transporter } = require('../helpers/nodemailer')
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
      next(err);
    }
  }
  static async callbackMidtrans(req, res, next) {
    try {
      const { transaction_status, order_id } = req.body;
      if (transaction_status === "settlement") {
        let transaction = await Transaction.findOne({
          where: {
            transactionNumber: order_id,
          },
        });
        if (!transaction) {
          throw {name: "transaction not found"};
        }
        if (transaction.status === "success") {
          throw {name: "transaction already settle"};
        }
        const user = await User.findOne({ where: { id: transaction.UserId } });

        await user.update({ balance: user.balance + transaction.price });
        await transaction.update({ status: "success" });

        const options = {
          attachments: [
            {
              filename: "Midtrans.png",
              path: "./views/Midtrans.png",
              cid: "midtrans",
            },
            {
              filename: "MAHAKARYA_LOGO_bg.png",
              path: "./views/MAHAKARYA_LOGO_bg.png",
              cid: "logo",
            },
          ],
          from: 'mahakaryaauction@gmail.com',
          to: `${user.email}`,
          subject: `Topup Balance Success!!!`,
          text: `pelanggan ${user.username} telah berhasil topup seharga ${formatRupiah(transaction.price)} dengan nomor transaksi ${order_id}`
        }
        
        transporter.sendMail(options, console.log("sent"))

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
          throw {name: "transaction not found"};
        }
        await transaction.update({ status: "failed" });
      }
      res.status(200).json({message: "Email Delivered"})
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MidtransController;
