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

var posts= [
  {
  "pId": 0,
  "content": "Since Houston, Texas was founded nearly two centuries ago, Houstonians have been treating its wetlands as stinky, mosquito-infested blots in need of drainage. Even after it became a widely accepted scientific fact that wetlands can soak up large amounts of flood water, the city continued to pave over them. The watershed of the White Oak Bayou river, which includes much of northwest Houston, is a case in point. From 1992 to 2010, this area lost more than 70% of its wetlands, according to research (pdf) by Texas A&M University.",
  "source": "https://qz.com/1064364/hurricane-harvey-houstons-flooding-made-worse-by-unchecked-urban-development-and-wetland-destruction/",
  "title": "Hurricane Harvey: Houston's flooding made worse by unchecked urban development and wetland destruction",
  "user": "tomswartz07",
  "upvotes": 45,
  "answers": []
  },
]

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

posts.forEach(function(obj) {
  db.collection("posts").doc(obj.pId.toString()).set({
      pId: obj.pId,
      content: obj.content,
      source: obj.source,
      title: obj.title,
      user:obj.user,
      upvotes: obj.upvotes,
      answers: obj.answers
  }).then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
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
              isAdmin: false,
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
        isAdmin: user.isAdmin,
        thread: user.thread,
        
      };
    } catch (e) {
      console.log(e.toString());
      return null;
    }
  },
  isAdmin: async function() {
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
      return userInfo.isAdmin;
    } catch (e) {
      console.log(e.toString());
      return;
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
        isAdmin: user.isAdmin,
        thread: user.thread,
        
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
            pId: postId,
            user: postInfo.user,
            title: postInfo.title,
            content: postInfo.content,
            source: postInfo.source,
            upvotes: postInfo.upvotes,

            categories: [],
            answers:postInfo.answers
          };
        })
      );
      // allPosts = allPosts.filter(post => post !== null && post.id);
     //console.log(allPosts);
      return allPosts;
    } catch (e) {
      console.log(e.toString());
      return [];
    }
  },

  getThisPost: async function(id) {
    try {
      var allPostIds = [];
      const posts = await db.collection("posts").get();
      posts.forEach(elem => {
        allPostIds.push(elem.id);
      });
      let allPosts = await Promise.all(
        allPostIds.map(async postId => {
          // console.log("READ post");
          if (postId == id) {
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
              source: postInfo.source,
              upvotes: postInfo.upvotes,
             
              categories: [],
              answers:postInfo.answers
            };
          }
          return {};
        })
      );
      // allPosts = allPosts.filter(post => post !== null && post.id);
      return allPosts.filter(value => Object.keys(value).length !== 0)[0];
    } catch (e) {
      console.log(e.stack);
      return;
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
  createNewPost: async function(title, body, source) {
    try {
      const indexOfNewPost = await this.indexOfNewPost();
      const userInfo = await this.getUserInfo();
      await db
        .collection("posts")
        .doc(indexOfNewPost.toString())
        .set({
          pId: indexOfNewPost,
          user: userInfo.name,
          title: title,
          content: body,
          source: source,
          upvotes: 0,
         
        });
    } catch (e) {
      console.log(e.toString());
      return;
    }
  },
  removeThisPost: async function(id) {
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
            .delete();
          return;
        }
      });
    } catch (e) {
      console.log(e.toString());
      return;
    }
  },
  
  updatePostAnswers: async function(id, taskID,updatedAnswer) {
    
    try {
      var allPostIds = [];
      const posts = await db.collection("posts").get();
      posts.forEach(elem => {
        allPostIds.push(elem.id);
      });
    
      await allPostIds.forEach(async postId => {
        
        if (Number(postId) === id) {
          
          const postInfoDoc = await db
            .collection("posts")
            .doc(postId)
            .get();
          const postInfo = postInfoDoc.data();
          
          if (!postInfo) {
            return { error: `failed to find the post with this id: ${id}` };
          }

  

          console.log("fb to update: ", updatedAnswer)
          
          await db
            .collection("posts")
            .doc(postId)
            .set({
             ...postInfo,
             answers:postInfo.answers.concat([
               {
                postId:updatedAnswer[0],
                taskId:updatedAnswer[1],
                user: updatedAnswer[2],
                answer: updatedAnswer[3],
                reason: updatedAnswer[4]
               }
             ])

            })
          
          

          return;
        }
      });
      // allPosts = allPosts.filter(post => post !== null && post.id);
    } catch (e) {
      console.log("fb error: ", e.toString());
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
              source: postInfo.source,
              upvotes: isUpvote ? postInfo.upvotes + 1 : postInfo.upvotes - 1,
              
              answers:postInfo.answers
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
              taskCateg: "initial triggering",
              userAns: userAns,
              doneAt: dateForKey
            }
          ],
          
        });
      await this.addCurrentThreadToThisUser(dateForKey);
    } catch (e) {
      console.log(e.toString());
      return;
    }
  },
  voteDuringThread: async function(id, isUpvote) {
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
              postId: id,
              taskCateg: "voteDuringThread",
              userAns: isUpvote ? "upvote" : "downvote",
              doneAt: new Date()
            }
          ])
        });
    } catch (e) {
      console.log(e.toString());
      return;
    }
  },
  addThisTaskOnThread: async function(postId, userAns, userReason,taskCateg) {
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
              userReason: userReason,
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
  },
  getAllThreadsOfThisUser: async function() {
    try {
      let threadsOfThesUser = [];
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
      ///
      let index = 0;
      const userThread = userInfo.thread;
      const allThreads = await db.collection("threads").get();
      userThread.forEach(uThread => {
        allThreads.forEach(elem => {
          if (uThread.toDate().toString() == elem.id.toString()) {
            threadsOfThesUser.push({
              tOrder: index,
              threadId: uThread,
              thread: elem.data().chain
            });
            index += 1;
          }
        });
      });
      return threadsOfThesUser;
    } catch (e) {
      console.log(e.toString());
      return;
    }
  },
  resetHistoryOfThisUser: async function() {
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
      ///
      const userThread = userInfo.thread;
      const allThreads = await db.collection("threads").get();
      userThread.forEach(uThread => {
        allThreads.forEach(elem => {
          if (uThread.toDate().toString() == elem.id.toString()) {
            db.collection("threads")
              .doc(elem.id)
              .delete();
          }
        });
      });
      await db
        .collection("users")
        .doc(user.userId)
        .set({
          ...userInfo,
          thread: []
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
