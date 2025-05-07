// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// הגדר את הקונפיגורציה של Firebase שלך
const firebaseConfig = {
  apiKey: "AIzaSyBsT17gw5Zmv9vPsc-uNZyTy1zLOhBJMUE",
  authDomain: "learn-72898.firebaseapp.com",
  projectId: "learn-72898",
  storageBucket: "learn-72898.firebasestorage.app",
  messagingSenderId: "501969319193",
  appId: "1:501969319193:web:97f781903b654e5ffd8188"
};

// אתחול היישום של Firebase
const app = initializeApp(firebaseConfig);

// הגדרת ה-authenticator של Firebase
const auth = getAuth(app);

export { auth, GoogleAuthProvider, signInWithPopup };
