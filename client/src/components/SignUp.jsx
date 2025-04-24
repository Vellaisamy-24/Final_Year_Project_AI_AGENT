import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { signIn } from "../store/Features/UserSlice";
import "../App.css"; // Adjust the relative path as necessary
import { useNavigate } from "react-router-dom";
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
        "http://localhost:5000/api/user/signUp",
        {
          email,
          password,
        }
      );

      if (response.status === 201) {
        toast.success("Register successfull");
        setTimeout(() => {
          navigate("/signIn");
        }, 200);
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
        <h1 className="signin-header">Sign Up</h1>

        <form onSubmit={(e) => handleSignIn(e)} className="signin-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              autocomplete="off"
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
              Sign Up
            </button>
          </div>
        </form>

        <div className="signup-link">
          <p>
            Already have an account?{" "}
            <a href="/signIn" className="signup-link-text">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
