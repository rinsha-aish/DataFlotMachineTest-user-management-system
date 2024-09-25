import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const newUser = {
      username,
      email,
      password,
      blocked: false,
      loginHistory: [],
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful");
    navigate("/");
  };

  return (
    <div className="register">
      <h2>Register</h2>
      <input
        className="register-input"
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="register-input"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="register-input"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="register-button" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
};

export default Register;
