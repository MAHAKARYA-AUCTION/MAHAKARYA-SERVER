const firebase = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("./mahakarya-e29e0-firebase-adminsdk-ytegx-7aa4bdcba2.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});
const firestore = getFirestore();
export default firestore;
