import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie for cookie management

const Login = () => {
  const [idValue, setIdValue] = useState("");
  const [pwValue, setPwValue] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate
  const clickLogin = async (event) => {
    event.preventDefault(); // Prevent page reload on form submission

    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/token/login", {
        username: idValue,
        password: pwValue,
      });

      // Handle successful login and store token in cookies
      if (response.data.auth_token) {
        Cookies.set("auth_token", response.data.auth_token, { expires: 7 }); // Set cookie for 7 days
        navigate("/");
      } else {
        alert("Invalid login credentials.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
        alert(`Login failed: ${error.response.data.detail || "Check your credentials."}`);
      } else {
        console.error("Error:", error.message);
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="wrapper">
      <div className="col">
        <form className="form" onSubmit={clickLogin}>
          <div className="form-block">
            <label className="form-label">Username</label>
            <input
              className="form-input"
              value={idValue}
              onChange={(e) => setIdValue(e.target.value)}
            />
          </div>
          <div className="form-block">
            <label className="form-label">Password:</label>
            <input
              className="form-input"
              type="password"
              value={pwValue}
              onChange={(e) => setPwValue(e.target.value)}
            />
          </div>
          <button type="submit" className="form-btn">
            Login
          </button>
        </form>
        Don’t have an account? <Link to={"/register"}>Register</Link>
      </div>
    </div>
  );
};

export default Login;
