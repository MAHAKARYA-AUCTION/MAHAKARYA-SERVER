// const { mockFirebase } = require("firestore-jest-mock");
// // const firestore = require("../config/firebase");

// // Create a fake Firestore with a `users` and `posts` collection
// mockFirebase({
//   database: {
//     users: [
//       { id: "abc123", name: "Homer Simpson" },
//       { id: "abc456", name: "Lisa Simpson" },
//     ],
//     posts: [{ id: "123abc", title: "Really cool title" }],
//   },
// });

// const { mockCollection } = require("firestore-jest-mock/mocks/firestore");

// test("testing stuff", () => {
//   //   const { Firestore } = require("@google-cloud/firestore");
//   //   const firestore = new Firestore();

//   return firestore
//     .collection("users")
//     .get()
//     .then((userDocs) => {
//       expect(mockCollection).toHaveBeenCalledWith("users");
//       expect(userDocs[0].name).toEqual("Homer Simpson");
//     });
// });
