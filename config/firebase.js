import * as firebase from "firebase-admin";
const serviceAccount = require("./mahakarya-e29e0-firebase-adminsdk-ytegx-7aa4bdcba2.json");

firebase.initializeApp({
  credential: firebase.cert(serviceAccount),
});
const firestore = firebase.getFirestore();
export default firestore;
