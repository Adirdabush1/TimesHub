import React, { useState } from "react";

interface AuthFormProps {
  isLogin: boolean;
  onSubmit: (formData: {
    email: string;
    password: string;
    name?: string;
  }) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password, ...(isLogin ? {} : { name }) });
  };

  const handleGoogleLogin = () => {
    // Temporary: redirect to backend Google OAuth endpoint
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit}>
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
