import React from "react";
import AiAgent from "./components/AiAgent.jsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp.jsx";
import SignIn from "./components/SignIn.jsx";
import Users from "./components/Admin/Users.jsx";
import { Toaster } from "react-hot-toast";
import Profile from "./components/Profile.jsx";
import QueryHistory from "./components/QueryHistory.jsx";
import Navbar from "./components/Navbar.jsx";
import "./App.css";
import UserProfile from "./components/Admin/UserProfile.jsx";

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/admin/getUser" element={<Users />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/queryHistory" element={<QueryHistory />} />
          <Route path="/admin/userProfile/:email" element={<UserProfile />} />
        </Routes>
      </Router>
      {/* <AiAgent /> */}
      {/* <SignUp /> */}
    </div>
  );
};

export default App;
