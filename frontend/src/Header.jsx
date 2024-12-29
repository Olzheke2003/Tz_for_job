import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();

  const isLoggedIn = !!Cookies.get("auth_token"); // Check if auth_token exists

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/auth/token/logout",
        {},
        {
          headers: {
            Authorization: `Token ${Cookies.get("auth_token")}`, // Include token
          },
        }
      );
      Cookies.remove("auth_token"); // Remove token from cookies
      alert("Logged out successfully.");
    } catch (error) {
      console.error("Logout Error:", error.response?.data || error.message);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <header>
      {isLoggedIn ? (
        <>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </header>
  );
};

export default Header;
