import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

  var config = {
    apiKey: "AIzaSyBx30onutgaUfcg1V9thBqIJXdbVjlF7oo",
    authDomain: "myfirstreactapp-15f5d.firebaseapp.com",
    databaseURL: "https://myfirstreactapp-15f5d.firebaseio.com",
    projectId: "myfirstreactapp-15f5d",
    storageBucket: "myfirstreactapp-15f5d.appspot.com",
    messagingSenderId: "469308881324"
  };
  firebase.initializeApp(config);

export default firebase;
