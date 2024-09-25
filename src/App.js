import React from "react";
import { Routes, Route } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import UserHome from "./components/UserHome";
import UserList from "./components/UserList";
import Register from "./components/Register";
import AdminLogin from "./components/AdminLogin";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLogin />} />
      <Route path="/register" element={<Register />} />
      <Route path="/user-home" element={<UserHome />} />
      <Route path="/user-list" element={<UserList />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
    </Routes>
  );
};

export default App;
