const firebase = require("firebase-admin");
const credentials = require("./key.json");
require('dotenv').config();
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
};
const ref = firebase.initializeApp({
  credential: firebase.credential.cert(credentials)
});
const db = firebase.firestore();
module.exports = {db,firebase};