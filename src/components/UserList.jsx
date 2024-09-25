import React, { useState } from "react";
import "./styles.css";

const UserList = () => {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [editingUser, setEditingUser] = useState(null);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [loginHistoryVisible, setLoginHistoryVisible] = useState({});

  const handleBlock = (index) => {
    users[index].blocked = true;
    setUsers([...users]);
    localStorage.setItem("users", JSON.stringify(users));
    alert("User blocked");
  };

  const handleUnblock = (index) => {
    users[index].blocked = false;
    setUsers([...users]);
    localStorage.setItem("users", JSON.stringify(users));
    alert("User unblocked");
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const updatedUsers = [
      ...users,
      { ...newUser, blocked: false, loginHistory: [] },
    ];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setNewUser({ username: "", email: "", password: "" });
    setShowAddUserForm(false);
  };

  const handleUpdateUser = (index) => {
    if (editingUser !== null) {
      users[index].username = editingUser.username;
      setUsers([...users]);
      localStorage.setItem("users", JSON.stringify(users));
      setEditingUser(null);
      alert("User updated");
    } else {
      setEditingUser({ index, username: users[index].username });
    }
  };

  const toggleLoginHistory = (index) => {
    setLoginHistoryVisible((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleDeleteUser = (index) => {
    const updatedUsers = users.filter((_, userIndex) => userIndex !== index);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    alert("User deleted");
  };

  return (
    <div className="user-list">
      <h2>User List</h2>
      <button
        className="toggle-add-user"
        onClick={() => setShowAddUserForm(!showAddUserForm)}
      >
        {showAddUserForm ? "Cancel" : "Add New User"}
      </button>

      {showAddUserForm && (
        <form className="add-user-form" onSubmit={handleAddUser}>
          <input
            className="user-input"
            type="text"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
            required
          />
          <input
            className="user-input"
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
          <input
            className="user-input"
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            required
          />
          <button className="add-user-button" type="submit">
            Add User
          </button>
        </form>
      )}

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul className="user-list-items">
          {users.map((user, index) => (
            <li
              key={index}
              className={`user-list-item ${user.blocked ? "blocked" : ""}`}
            >
              {user.username} - {user.email}
              <button
                className="user-action-button"
                onClick={() =>
                  user.blocked ? handleUnblock(index) : handleBlock(index)
                }
              >
                {user.blocked ? "Unblock" : "Block"}
              </button>
              <button
                className="user-action-button"
                onClick={() => handleUpdateUser(index)}
              >
                {editingUser?.index === index ? "Save" : "Edit Name"}
              </button>
              {editingUser?.index === index && (
                <input
                  className="edit-username-input"
                  type="text"
                  value={editingUser.username}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, username: e.target.value })
                  }
                  placeholder="New Username"
                />
              )}
              <button
                className="user-action-button"
                onClick={() => toggleLoginHistory(index)}
              >
                {loginHistoryVisible[index]
                  ? "Hide Login History"
                  : "Show Login History"}
              </button>
              {loginHistoryVisible[index] && (
                <div className="login-history">
                  <h4>Login History for {user.username}</h4>
                  <ul>
                    {user.loginHistory.length === 0 ? (
                      <p>No login history available.</p>
                    ) : (
                      user.loginHistory.map((record, recordIndex) => (
                        <li key={recordIndex}>
                          Logged in at {record.timestamp}
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              )}
              <button
                className="user-action-button"
                onClick={() => handleDeleteUser(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
