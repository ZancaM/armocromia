const admin = require("firebase-admin");

// Firebase console -> Project Settings -> Service and Accounts -> Generate new private key
// TODO - add this file in your .git ignore file. DO NOT PUSH IT TO THE REPO
const serviceAccount = require("../armocromia-firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://armocromia.firebaseio.com"
});

const firestore = admin.firestore();
module.exports = {
  firestore
};
