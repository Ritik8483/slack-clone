import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // apiKey: "AIzaSyDz-ArxE_wWyBfEv7uZFBgT4s49RRzG3y0",
  // authDomain: "slack-clone-48139.firebaseapp.com",
  // projectId: "slack-clone-48139",
  // storageBucket: "slack-clone-48139.appspot.com",
  // messagingSenderId: "168513532097",
  // appId: "1:168513532097:web:e99b47f9f5a492e8a92440",
  
  apiKey: "AIzaSyDz-ArxE_wWyBfEv7uZFBgT4s49RRzG3y0",
  authDomain: "slack-clone-48139.firebaseapp.com",
  projectId: "slack-clone-48139",
  storageBucket: "slack-clone-48139.appspot.com",
  messagingSenderId: "168513532097",
  appId: "1:168513532097:web:e99b47f9f5a492e8a92440"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
// const auth = getAuth(firebaseApp);
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
