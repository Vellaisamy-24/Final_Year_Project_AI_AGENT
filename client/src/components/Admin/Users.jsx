import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./Users.css"; // CSS file for styling

const Users = () => {
  useEffect(() => {
    getUser();
  }, []);

  const [user, setUser] = useState([]);

  const navigate = useNavigate();
  const getUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/getUser",
        { email: "vellaikarthick24@gmail.com" }
      );
      setUser(response?.data?.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="users-container">
      <h2 className="users-heading">User List</h2>
      <div className="user-list">
        {user && user.length > 0 ? (
          user.map((data, index) => (
            <div
              onClick={(e) => navigate(`/admin/userProfile/${data.email}`)}
              key={index}
              className="user-card"
            >
              <p>
                <strong>Name:</strong> {data.userName}
              </p>
              <p>
                <strong>Email:</strong> {data.email}
              </p>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default Users;
