// login.ts
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./components/firebase";

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const token = await result.user.getIdToken(); 
  await fetch("http://localhost:3000/auth/google", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
}
