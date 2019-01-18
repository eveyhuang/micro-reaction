// import * as firebase from 'firebase';
// import {
//   FIREBASE_APP_NAME,
//   FIREBASE_API_KEY,
//   FIREBASE_SENDER_ID
// } from "../configs/firebaseConfigs";

export const FIREBASE_APP_NAME = "micro-reaction-1e530";
export const FIREBASE_API_KEY = "AIzaSyBStrPkEOxIu4KoulLiKERZY0-YmwE_iOo";
export const FIREBASE_SENDER_ID = "339249208466";

var firebase = require("firebase");

firebase.initializeApp({
  apiKey: FIREBASE_API_KEY,
  authDomain: `${FIREBASE_APP_NAME}.firebaseapp.com`,
  databaseURL: `https://${FIREBASE_APP_NAME}.firebaseio.com`,
  projectId: FIREBASE_APP_NAME,
  storageBucket: `${FIREBASE_APP_NAME}.appspot.com`,
  messagingSenderId: FIREBASE_SENDER_ID
});

const auth = firebase.auth();
const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});

var arrived = false;
var userObject = null;

auth.onAuthStateChanged(user => {
  console.log("READ");
  if (user) {
    arrived = true;
    userObject = user;
    console.log("USER", user.uid);
  }
});

// const chatIndexStore = {};

// // 'api' functions (e.g. api.logout())
// // For all functions, if they fail to run, return 'null'
export default {
  signup: async function(name, email, password) {
    // INPUT
    // name: user's name
    // email: user's email
    // password: user's password
    // OUTPUT
    // Object {
    //   userId: user's identifier
    //   name: user's name
    // }
    try {
      var userData, uid;
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then(function success(userCredential) {
          userData = userCredential.user;
          uid = userData.uid;
          db.collection("users")
            .doc(uid)
            .set({
              userId: uid,
              email: email,
              name: name,
              createdAt: new Date()
            });
          arrived = true;
          console.log("uid:", uid);
        });
      //   return { userId: uid, name: name };
      return null;
    } catch (e) {
      console.log(e.toString());
      return { error: e.code, errorMessage: e.toString() };
    }
  },
  login: async function(email, password) {
    // INPUT
    // email: user's email
    // password: user's password
    // OUTPUT
    // Object {
    //   userId: user's identifier
    //   name: user's name
    // }

    try {
      var userData = null;
      var uid = null;
      var user = null;
      //   const user =
      await auth
        .signInWithEmailAndPassword(email, password)
        .then(function success(userCredential) {
          userData = userCredential.user;
          uid = userData.uid;
          if (!userData) {
            user = userObject;
          }
          if (!uid) {
            return { error: "uid is null" };
          }
          console.log("LOGIN READ");
        });
      //   const userDoc = await
      const userDoc = await db
        .collection("users")
        .doc(uid)
        .get();
      const userInfo = userDoc.data();
      //   userObject.uid = userInfo.userId;
      //   userObject.displayName = userInfo.name;
      return null;
    } catch (e) {
      console.log("here,", e.toString());
      return { error: e.code, errorMessage: e.toString() };
    }
  },
  logout: async function() {
    // INPUT
    // null
    // OUTPUT
    // Object {}
    try {
      return auth.signOut();
    } catch (e) {
      console.log(e.toString());
      return null;
    }
  },
  getUser: async function() {
    // INPUT
    // null
    // OUTPUT
    // Object {
    //   userId: user's identifier
    //   name: user's name
    // }
    try {
      var user = await auth.currentUser;
      if (!user) {
        user = userObject;
      }
      if (!user) {
        return null;
      }
      return {
        userId: user.uid,
        name: user.name
      };
    } catch (e) {
      console.log(e.toString());
      return null;
    }
  },
  getUserInfo: async function() {
    try {
      const user = await this.isUserLoggedIn();
      if (!user) {
        return null;
      }
      const userDoc = await db
        .collection("users")
        .doc(user.userId)
        .get();
      const userInfo = userDoc.data();
      arrived = true;
      return {
        userId: userInfo.userId,
        name: userInfo.name
      };
    } catch (e) {
      console.log(e.toString());
      return null;
    }
  },
  isUserLoggedIn: function() {
    return new Promise(function(resolve, reject) {
      let count = 0;
      var interval = setInterval(function() {
        if (count > 100) {
          if (userObject) {
            arrived = true;
            resolve({
              userId: userObject.uid,
              name: userObject.name
            });
          } else {
            resolve(false);
          }
          clearInterval(interval);
          return;
        }
        if (arrived) {
          if (userObject) {
            resolve({
              userId: userObject.uid,
              name: userObject.name
            });
          } else {
            resolve(false);
          }
          return;
        }
        count++;
      }, 10);
    });
  }
};
