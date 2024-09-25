import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const UserHome = () => {
  const navigate = useNavigate();
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const loggedInUser = users.find(
    (user) => user.username === sessionStorage.getItem("loggedInUser")
  );

  if (!loggedInUser) {
    navigate("/login");
    return null;
  }

  return (
    <div className="user-home">
      <h2>Welcome back, {loggedInUser.username}!</h2>
      <button className="logout-button" onClick={() => navigate("/login")}>
        Logout
      </button>
    </div>
  );
};

export default UserHome;
