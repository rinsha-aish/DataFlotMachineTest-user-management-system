import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      navigate("/user-list");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="admin-login">
      <h2>Admin Login</h2>
      <input
        className="login-input"
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="login-input"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default AdminLogin;
