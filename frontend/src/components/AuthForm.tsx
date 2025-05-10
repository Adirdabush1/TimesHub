// src/components/AuthForm.tsx
import React, { useState } from "react";
import { auth, GoogleAuthProvider, signInWithPopup } from "./Firebase.tsx"; // import the new methods
import { useNavigate } from 'react-router-dom';
import {useUser} from "./UserContext.tsx"


const AuthForm: React.FC<{ isLogin: boolean }> = ({ isLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();


  // פונקציה להתחברות עם גוגל דרך Firebase
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();  // הגדרת ספק התחברות של גוגל
      const result = await signInWithPopup(auth, provider); // התחברות דרך פופאפ
      const user = result.user;  // קבלת פרטי המשתמש
      console.log("User signed in with Google: ", user);
      localStorage.setItem("user", JSON.stringify({ email: user.displayName || "Unknown" }));
      localStorage.setItem("authMethod", "google"); // <--- שורת מפתח!

      setUser({ username: user.displayName || "Unknown" });


      navigate("/");

      
    } catch (error) {
      console.error("Google login failed: ", error);
    }
  };

  

  // פונקציה לשליחת בקשה לשרת להירשם או להתחבר
  const handleRegister = async (formData: { email: string; password: string; name?: string }) => {
    try {
      const res = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (!res.ok) {
        throw new Error('Failed to register');
      }
  
      const data = await res.json();
      console.log(data);
      
      localStorage.setItem("user", JSON.stringify({
        name: formData.name || "User",
        email: formData.email
      }));
      localStorage.setItem("authMethod", "local"); // <--- שורת מפתח!
      setUser({ username: formData.name || "User" });

      navigate("/");
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
  

  return (
    <div className="space-y-4">
      <form onSubmit={(e) => { e.preventDefault(); handleRegister({ email, password, ...(isLogin ? {} : { name }) }); }}>
        {/* אם לא ב-login, צריך גם שדה name */}
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>

      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <p>or</p>
        <button
          onClick={handleGoogleLogin}
          style={{
            background: "#fff",
            border: "1px solid #ccc",
            padding: "0.5rem 1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
            marginTop: "0.5rem",
          }}
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google logo"
            style={{ width: "20px", height: "20px" }}
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default AuthForm;


