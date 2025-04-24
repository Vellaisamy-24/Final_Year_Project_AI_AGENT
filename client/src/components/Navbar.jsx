import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../store/Features/UserSlice";
// import "./Navbar.css"; // or wherever your CSS is

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const handleLogout = () => {
    dispatch(signOut());
    navigate("/signIn");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">AI AGENT</div>
      <ul className="navbar-links">
        {!user && (
          <>
            <li>
              <button
                className="button-class"
                onClick={() => navigate("/signIn")}
              >
                Sign In
              </button>
            </li>
            <li>
              <button className="button-class" onClick={() => navigate("/")}>
                Sign Up
              </button>
            </li>
          </>
        )}

        {user && (
          <>
            <li>
              <button
                className="button-class"
                onClick={() => navigate("/user/queryHistory")}
              >
                Query History
              </button>
            </li>

            <li>
              <button
                className="button-class"
                onClick={() => navigate("/user/profile")}
              >
                Profile
              </button>
            </li>

            {user.admin && (
              <li>
                <button
                  className="button-class"
                  onClick={() => navigate("/admin/getUser")}
                >
                  Admin
                </button>
              </li>
            )}

            <li>
              <button className="button-class" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
