// import * as firebase from 'firebase';
// import {
//   FIREBASE_APP_NAME,
//   FIREBASE_API_KEY,
//   FIREBASE_SENDER_ID
// } from "../configs/firebaseConfigs";
import { observer, inject } from "mobx-react";

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
  console.log("auth READ");
  if (user) {
    arrived = true;
    userObject = user;
    // console.log("USER", user.uid);
  }
});

// const elemIndexStore = {};

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
              createdAt: new Date(),
              thread: []
            });
          arrived = true;
          // console.log("uid:", uid);
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
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
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
        name: userInfo.name,
        email: userInfo.email,
        createdAt: userInfo.createdAt
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
  },
  getAllPosts: async function() {
    //   await db
    //   .collection("posts")
    //   .doc("0")
    //   .set({
    //     pId: 0,
    //     user: "LaysClassic1oz",
    //     title: "First Hand Account Of The Day After Hurrican Sandy",
    //     content:
    //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    //     upvotes: 20,
    //     createdAt: new Date()
    //   });
    // await db
    //   .collection("posts")
    //   .doc("1")
    //   .set({
    //     pId: 1,
    //     user: "rauce12",
    //     title: "7 places to get help with Sandy loans in New Jersey",
    //     content:
    //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    //     upvotes: 16,
    //     createdAt: new Date()
    //   });
    // await db
    //   .collection("posts")
    //   .doc("2")
    //   .set({
    //     pId: 2,
    //     user: "goodnik",
    //     title: "Leave No Pet Behind! Pet Evacuation Laws in NYC",
    //     content:
    //       " Be sure to keep your pet's necessities ready in a to-go bag should you need to evacuate on short notice. Best to include: (at least) a couple days of food veterinary (vaccination) records (put in Ziploc bag to ensure they stay dry) any vital medications (7 days worth is ideal) ID tags. For cat owners: You may want to limit your pet's access to hideaways so that you can easily grab them and load them into a carrier in the event of an evacuation.",
    //     upvotes: 8,
    //     createdAt: new Date()
    //   });
    // await db
    //   .collection("posts")
    //   .doc("3")
    //   .set({
    //     pId: 3,
    //     user: "deleted",
    //     title: "A safety note when dealing with flooded streets...",
    //     content:
    //       "From a New Orleanian who is used to flooding in urban areas: STAY THE FUCK OFF THE FLOODED STREETS!!!! Why? Because manhole covers get unseated and leave open holes that if you fall in, you won't be coming out of. Think about it as the strongest riptide possible. You can't swim out of it. You can't escape once you're in. You'll die a painful death drowning and scared. Unless you can be 100% sure of where you're walking, don't risk it. Every time it floods in New Orleans, there's always a death or two (at least) that happens this way and it's entirely avoidable. Take care of yourselves and be safe. Just because the rain has stopped doesn't mean that flood waters are safe to wade in.",
    //     upvotes: 6,
    //     createdAt: new Date()
    //   });
    // await db
    //   .collection("posts")
    //   .doc("4")
    //   .set({
    // pId: 4,
    // user: "tomswartz07",
    // title: "Tip: Charge your computers and devices now",
    // content:
    //   "Tip: Charge your computers and devices now. Even if internet is down, you can use USB ports to charge your phones if the power goes out!",
    // upvotes: 5,
    // createdAt: new Date()
    //   });

    try {
      var allPostIds = [];
      const posts = await db.collection("posts").get();
      posts.forEach(elem => {
        allPostIds.push(elem.id);
      });
      let allPosts = await Promise.all(
        allPostIds.map(async postId => {
          // console.log("READ post");
          const postInfoDoc = await db
            .collection("posts")
            .doc(postId)
            .get();
          const postInfo = postInfoDoc.data();
          if (!postInfo) {
            return {};
          }
          return {
            id: postInfo.pId,
            postId: postId,
            user: postInfo.user,
            title: postInfo.title,
            content: postInfo.content,
            upvotes: postInfo.upvotes,
            createdAt: postInfo.createdAt,
            categories: []
          };
        })
      );
      // allPosts = allPosts.filter(post => post !== null && post.id);
      return allPosts;
    } catch (e) {
      console.log(e.toString());
      return [];
    }
  },
  indexOfNewPost: async function() {
    try {
      var allPostIds = [];
      const posts = await db.collection("posts").get();
      posts.forEach(elem => {
        allPostIds.push(elem.id);
      });
      return allPostIds.length;
    } catch (e) {
      console.log(e.toString());
      return;
    }
  },
  voteOnThisPost: async function(id, isUpvote) {
    try {
      var allPostIds = [];
      const posts = await db.collection("posts").get();
      posts.forEach(elem => {
        allPostIds.push(elem.id);
      });
      await allPostIds.forEach(async postId => {
        if (postId == id) {
          const postInfoDoc = await db
            .collection("posts")
            .doc(postId)
            .get();
          const postInfo = postInfoDoc.data();
          if (!postInfo) {
            return { error: `fail to search the post with this id: ${id}` };
          }
          await db
            .collection("posts")
            .doc(postId)
            .set({
              pId: postInfo.pId,
              user: postInfo.user,
              title: postInfo.title,
              content: postInfo.content,
              upvotes: isUpvote ? postInfo.upvotes + 1 : postInfo.upvotes - 1,
              createdAt: postInfo.createdAt
            });
          return;
        }
      });
      // allPosts = allPosts.filter(post => post !== null && post.id);
    } catch (e) {
      console.log(e.toString());
      return;
    }
  },
  newTaskThread: async function(postId, userAns) {
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

      var allThreadIds = [];
      const threads = await db.collection("threads").get();
      threads.forEach(elem => {
        allThreadIds.push(elem.id);
      });
      const dateForKey = new Date();
      await db
        .collection("threads")
        .doc(dateForKey.toString())
        .set({
          userId: userInfo.userId,
          userName: userInfo.name,
          chain: [
            {
              postId: postId,
              taskCateg: "initial voting",
              userAns: userAns,
              doneAt: dateForKey
            }
          ],
          createdAt: dateForKey
        });
      await this.addCurrentThreadToThisUser(dateForKey);
    } catch (e) {
      console.log(e.toString());
      return;
    }
  },
  addThisTaskOnThread: async function(postId, userAns, taskCateg) {
    try {
      // console.log("inherit props:",postId, userAns, taskCateg)
      var allThreadIds = [];
      // const threads =
      await db
        .collection("threads")
        .get()
        .then(threads => {
          threads.forEach(elem => {
            allThreadIds.push(elem.id);
          });
        });
      const lastThreadId = allThreadIds[allThreadIds.length - 1];
      const lastThread = await db
        .collection("threads")
        .doc(lastThreadId.toString())
        .get();
      const lastThreadData = lastThread.data();
      db.collection("threads")
        .doc(lastThreadId)
        .set({
          ...lastThreadData,
          chain: lastThreadData.chain.concat([
            {
              postId: postId,
              taskCateg: taskCateg,
              userAns: userAns,
              doneAt: new Date()
            }
          ])
        });
    } catch (e) {
      console.log(e.toString());
      return;
    }
  },
  addCurrentThreadToThisUser: async function(threadId) {
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
      await db
        .collection("users")
        .doc(user.userId)
        .set({
          ...userInfo,
          thread: userInfo.thread.concat([threadId])
        });
    } catch (e) {
      console.log(e.toString());
      return;
    }
  }
  // numOfPosts : async function() {
  //   try {

  //   } catch (e) {
  // console.log(e.toString());
  // return;
  //   }
  // }
};
