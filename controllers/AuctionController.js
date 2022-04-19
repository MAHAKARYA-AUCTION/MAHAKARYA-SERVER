const path = require("path");
const { User, Lot, Collection } = require("../models/index");
// const firestore = require("../config/firebase.js");
const firestore = path.basename("../config/firebase.js");

class AuctionController {
  static async bidAuction(req, res, next) {
    try {
      const { lotId } = req.params;
      const { userId, sum } = req.body;

      const lot = await Lot.findOne({
        include: [{ model: Collection }, { model: User }],
        where: { id: lotId },
      });

      if (!lot) {
        throw new Error("LOT_NOT_FOUND");
      }

      if (sum <= lot.startingBid) {
        throw new Error("USER_BID_MUST_HIGHER");
      }

      const highestBid = await firestore
        .collection("HighestBid")
        .doc(lotId)
        .get()
        .then((doc) => {
          return doc.get("bidID");
        });

      const user = await User.findOne({
        where: { id: userId },
        attributes: ["id", "username", "balance", "balanceSpent"],
      });

      console.log(user);
      const availableMoney = parseInt(user.balance) - parseInt(user.balanceSpent);
      console.log("sisa: ", availableMoney);

      if (sum > availableMoney) {
        throw new Error("USER_MONEY_NOT_ENOUGH");
      }

      if (highestBid) {
        const highestBidInfo = await firestore.collection("bid").doc(highestBid).get();
        const lastPrice = highestBidInfo.get("price");
        const previousUserId = highestBidInfo.get("userId");
        if (sum <= lastPrice) {
          throw new Error("USER_BID_MUST_HIGHER");
        }

        const lastUser = await User.findOne({
          where: { id: previousUserId },
          attributes: ["id", "username", "balanceSpent"],
        });
        await lastUser.update({
          balanceSpent: lastUser.balanceSpent - lastPrice,
        });
        console.log(lastUser.balanceSpent);
      }

      await user.update({
        balanceSpent: parseInt(user.balanceSpent) + parseInt(sum),
      });

      const bidRef = firestore.collection("bid");
      const { id: bidID } = await bidRef.add({
        price: +sum,
        userId: +userId,
        lotId: +lotId,
        lotName: lot.name,
        lotPainter: lot.artistName,
        username: user.username,
        createdAt: new Date(),
      });

      const highestRef = firestore.collection("HighestBid").doc(lotId);
      await highestRef.set({
        bidID,
        price: +sum,
        userId: +userId,
        username: user.username,
        lotId: +lotId,
        collectionId: lot.CollectionId,
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
