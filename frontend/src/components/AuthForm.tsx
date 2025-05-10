// src/components/AuthForm.tsx
import React, { useState } from "react";
import { auth, GoogleAuthProvider, signInWithPopup } from "./Firebase.tsx";
import { useNavigate } from 'react-router-dom';
import { useUser } from "./UserContext.tsx";
import "./AuthForm.css"

const AuthForm: React.FC<{ isLogin: boolean; onSubmit: (formData: { email: string; password: string; name?: string }) => Promise<void> }> = ({ isLogin, onSubmit }) => {
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem("user", JSON.stringify({ email: user.displayName || "Unknown" }));
      localStorage.setItem("authMethod", "google");
      setUser({ username: user.displayName || "Unknown" });
      navigate("/");
    } catch (error) {
      console.error("Google login failed: ", error);
    }
  };

  const handleRegister = async (formData: { email: string; password: string; name?: string }) => {
    try {
      const res = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to register');

      const data = await res.json();
      localStorage.setItem("user", JSON.stringify({
        name: formData.name || "User",
        email: formData.email
      }));
      localStorage.setItem("authMethod", "local");
      setUser({ username: formData.name || "User" });
      navigate("/");
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="container" id="container">
      <div className={`form-container ${isLogin ? "sign-in-container" : "sign-up-container"}`}>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleRegister({ email, password, ...(isLogin ? {} : { name }) });
        }}>
          <h1>{isLogin ? "Sign In" : "Create Account"}</h1>
          <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span>{isLogin ? "or use your account" : "or use your email for registration"}</span>

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

          <button type="submit">{isLogin ? "Sign In" : "Sign Up"}</button>
        </form>
        <button className="ghost" onClick={handleGoogleLogin} style={{ marginTop: "10px" }}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
