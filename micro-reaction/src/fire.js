import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyA2uYoAHxkdcIO-51GYuJxf6YXeBWcu_Ho",
    authDomain: "micro-reaction.firebaseapp.com",
    databaseURL: "https://micro-reaction.firebaseio.com",
    projectId: "micro-reaction",
    storageBucket: "micro-reaction.appspot.com",
    messagingSenderId: "868707662659"
  };

var fire = firebase.initializeApp(config);
export default fire;