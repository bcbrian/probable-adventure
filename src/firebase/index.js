// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpxhV4nRK_fDtSIa9FxiTIJubvJOyZW-4",
  authDomain: "code-quests.firebaseapp.com",
  databaseURL: "https://code-quests.firebaseio.com",
  projectId: "code-quests",
  storageBucket: "code-quests.appspot.com",
  messagingSenderId: "184721895245",
  appId: "1:184721895245:web:027227f4ee68dfcc8e5104"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export { firebase };
