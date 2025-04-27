import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const { email } = useParams();
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/getSingleUser",
        { email }
      );
      setUser(response?.data?.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // full viewport height
        background: "#ffffff",
      }}
    >
      {user ? (
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "30px",
            maxWidth: "400px",

            background: "#f5f5f5",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              fontSize: "26px",
              marginBottom: "20px",
              textAlign: "center",
              color: "#333",
            }}
          >
            User Profile
          </h2>
          <p>
            <strong>Name:</strong> {user.userName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>State:</strong> {user.state}
          </p>
          <p>
            <strong>Country:</strong> {user.country}
          </p>
          <p>
            <strong>Address:</strong> {user.address}
          </p>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default UserProfile;
