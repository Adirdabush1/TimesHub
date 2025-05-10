import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import { login, register } from "../services/AuthService";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async (formData: {
    email: string;
    password: string;
    name?: string;
  }) => {
    try {
      const res = isLogin
        ? await login(formData.email, formData.password)
        : await register(formData.name!, formData.email, formData.password);

      const token = res.data.token;
      localStorage.setItem("token", token);
      alert("Logged in!");
    } catch (err: any) {
      alert(err.response?.data?.message || "Auth failed");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <AuthForm isLogin={isLogin} onSubmit={handleAuth} />
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="mt-4 text-blue-500"
      >
        {isLogin ? "Register" : "Already have an account? Login"}
      </button>
    </div>
  );
};

export default Auth;
