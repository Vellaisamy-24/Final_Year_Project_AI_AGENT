import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
// import "./Profile.css"; // import the css file

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
      </form>
    </section>
  );
};

export default Profile;
