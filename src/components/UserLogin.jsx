import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const UserLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (username === "admin" && password === "admin") {
      navigate("/user-list");
      return;
    }

    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      if (user.blocked) {
        alert("You are blocked by admin.");
        return;
      }

      if (!user.loginHistory) {
        user.loginHistory = [];
      }

      user.loginHistory.push({ timestamp: new Date().toLocaleString() });
      localStorage.setItem("users", JSON.stringify(users));

      sessionStorage.setItem("loggedInUser", user.username);
      navigate("/user-home");
    } else {
      alert("Invalid username or password");
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <h2>User Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <p>
        Don't have an account?{" "}
        <button onClick={handleRegister} className="register-button">
          Register
        </button>
      </p>
    </div>
  );
};

export default UserLogin;
