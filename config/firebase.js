// const firebase = require("firebase-admin");
// const { getFirestore } = require("firebase-admin/firestore");
import * as firebase from "firebase-admin";
// const { initializeApp, cert } = require("firebase-admin/app");
// const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require("./mahakarya-e29e0-firebase-adminsdk-ytegx-7aa4bdcba2.json");

firebase.initializeApp({
  credential: firebase.cert(serviceAccount),
});
const firestore = firebase.getFirestore();
export default firestore;
