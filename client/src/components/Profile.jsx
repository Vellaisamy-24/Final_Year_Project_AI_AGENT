import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    handleProfile();
  }, []);

  const handleProfile = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/getSingleUser",
        { email: user.email }
      );
      const u = response?.data?.user;
      setUserName(u?.userName);
      setEmail(u?.email);
      setAddress(u?.address);
      setState(u?.state);
      setCountry(u?.country);
      setPostalCode(u?.postalCode);
      setPhone(u?.phone);
      setCity(u?.city);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/user/updateUser/${user._id}`,
        {
          userName,
          phone,
          address,
          city,
          country,
          postalCode,
          state,
        }
      );
      handleProfile();
      if (response.status === 200) {
        setTimeout(() => {
          toast.success("Profile Updated");
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProfile = async () => {
    if (!window.confirm("Are you sure you want to delete your profile?"))
      return;
    try {
      const response = await axios.delete(
        "http://localhost:5000/api/user/deleteUser",
        { email: user.email }
      );
      if (response.status === 200) {
        toast.success("Profile deleted successfully");
        // Clear localStorage/sessionStorage or Redux if needed
        // localStorage.removeItem("token");
        // Redirect to signin
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="profile-container">
      <form onSubmit={handleProfileUpdate} className="profile-form">
        <h2>User Profile</h2>

        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} disabled />
        </div>

        <div className="form-group">
          <label>User Name</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Postal Code</label>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>State</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows="3"
          ></textarea>
        </div>

        <button type="submit" className="update-button">
          Update Profile
        </button>
        <div
          style={{
            backgroundColor: "lightcoral",
            color: "white",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "8px",
            borderRadius: "5px  ",
          }}
          type="button"
          onClick={handleDeleteProfile}
          // className="delete-button"
        >
          Delete Profile
        </div>
      </form>

      {/* Delete Profile button */}
    </section>
  );
};

export default Profile;
