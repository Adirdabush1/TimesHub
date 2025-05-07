import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBsT17gw5Zmv9vPsc-uNZyTy1zLOhBJMUE",
  authDomain: "learn-72898.firebaseapp.com",
  projectId: "learn-72898",
  storageBucket: "learn-72898.firebasestorage.app",
  messagingSenderId: "501969319193",
  appId: "1:501969319193:web:97f781903b654e5ffd8188"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// ✅ הוספת ייצוא של GoogleAuthProvider
export const provider = new GoogleAuthProvider();
export { GoogleAuthProvider };
