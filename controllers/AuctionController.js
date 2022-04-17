const { User } = require("../models/index");
const firestore = require("../config/firebase");

class AuctionController {
  static async bidAuction(req, res, next) {
    try {
      const { lotId } = req.params;
      const { userId, sum } = req.body;

      const highestBid = await firestore
        .collection("HighestBid")
        .doc(lotId)
        .get()
        .then((doc) => {
          return doc.get("bidID");
        });

      const user = await User.findOne({
        where: { id: userId },
        attributes: ["id", "username", "balance", "balanceSpent"]
      });

      console.log(user);
      const availableMoney =
        parseInt(user.balance) - parseInt(user.balanceSpent);
      console.log("sisa: ", availableMoney);

      if (highestBid) {
        const highestBidInfo = await firestore
          .collection("bid")
          .doc(highestBid)
          .get();
        const lastPrice = highestBidInfo.get("price");
        const previousUserId = highestBidInfo.get("userId");
        if (sum <= lastPrice) {
          throw new Error("USER_BID_MUST_HIGHER");
        }

        if (sum > availableMoney) {
          throw new Error("USER_MONEY_NOT_ENOUGH");
        }

        const lastUser = await User.findOne({
          where: { id: previousUserId },
          attributes: ["id", "username", "balanceSpent"]
        });
        await lastUser.update({
          balanceSpent: lastUser.balanceSpent - lastPrice
        });
        console.log(lastUser.balanceSpent);
      }

      await user.update({
        balanceSpent: parseInt(user.balanceSpent) + parseInt(sum)
      });

      const bidRef = firestore.collection("bid");
      const { id: bidID } = await bidRef.add({
        price: +sum,
        userId: +userId,
        lotId: +lotId,
        username: user.username,
        createdAt: new Date()
      });

      const highestRef = firestore.collection("HighestBid").doc(lotId);
      await highestRef.set({
        bidID
      });

      res.status(200).json({ msg: "Success Bid" });
    } catch (error) {
      console.log(error);
      let msg = "Internal Server Error";
      let code = 500;
      if (error.message === "USER_BID_MUST_HIGHER") {
        msg = "Bid Must Higher than previous bid";
        code = 400;
      } else if (error.message === "USER_MONEY_NOT_ENOUGH") {
        msg = "User doesnt have enough avalible money to bid";
        code = 400;
      }
      res.status(code).json({ msg });
    }
  }
}

module.exports = AuctionController;
