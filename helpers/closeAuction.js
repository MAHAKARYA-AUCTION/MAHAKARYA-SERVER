const firestore = require("../config/firebase");
const { Transaction, User, Collection } = require("../models");

const closeAuction = async (collectionId) => {
  console.log(collectionId);
  // console.log("------------------ TEST ------------------");
  const highestBid = await firestore.collection("HighestBid").where('collectionId', "==", collectionId).get();
  let listHighest = highestBid.docs.map((doc) => doc.data());
  console.log(listHighest);

  await Collection.update({ endDate : new Date() }, {
    where: {
      id: collectionId,
    },
  });

  //create transaction
  if (listHighest.length > 0) {
    let data = listHighest.map((e) => {
      let transaction_id = `PAYMENT-ID-${Math.floor(Date.now() / 10)}`;
      let tmp = {
        UserId: e.userId,
        LotId: e.lotId,
        transactionNumber: transaction_id,
        price: e.price,
        status: "success",
        type: "payment"
      };
      return tmp;
    });
    // console.log(data);

    await Transaction.bulkCreate(data);

    //reduce saldo
    let user = {};
    listHighest.forEach((e) => {
      if (user[e.userId]) {
        user[e.userId] += e.price;
      } else {
        user[e.userId] = e.price;
      }
    });
    let listUserTotalSpent = [];
    for (const key in user) {
      listUserTotalSpent.push({
        id: key,
        balance: user[key]
      });
    }

    //let listUserTotalSpent = Object.entries(user);
    listUserTotalSpent.forEach(async (e) => {
      await User.findOne({ where: { id: e.id } }).then((user) => {
        await user.update({balanceSpent: 0});
        return await user.increment("balance", { by: -e.balance });
      });
    });
  }
};

// module.exports = {
//   closeAuction
// };

closeAuction(1);
