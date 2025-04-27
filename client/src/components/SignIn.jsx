import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { signIn } from "../store/Features/UserSlice";
import "../App.css"; // Adjust the relative path as necessary
import { useNavigate } from "react-router-dom";
import OAuth from "./OAuth";
// Import the custom CSS file

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/signIn",
        {
          email,
          password,
        }
      );

      dispatch(
        signIn({
          email: response.data.user.email,
          _id: response.data.user._id,
          admin: response.data.admin,
        })
      );

      if (response.status === 200) {
        toast.success("SignIn success");
        navigate("/user/queryHistory");
      } else {
        toast.error(response.data?.message || "Error");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="signin-container">
      <div className="signin-form-container">
        <h1 className="signin-header">Sign In</h1>

        <form
          autocomplete="off"
          onSubmit={handleSignIn}
          className="signin-form"
        >
          <div className="form-group">
            <label
              htmlFor="email"
              autocomplete="off"
              // autocomplete="new-password"
              // autocomplete="nope"
              className="form-label"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
              placeholder="Enter your password"
            />
          </div>

          <div className="form-group">
            <button type="submit" className="signin-button">
              Sign In
            </button>
          </div>
        </form>
        <hr style={{ margin: "10px", color: "black" }} />
        <OAuth />

        <div className="signup-link">
          <p>
            Don't have an account?{" "}
            <a href="/" className="signup-link-text">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
