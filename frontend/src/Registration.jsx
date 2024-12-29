import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate
  const clickRegister = async (event) => {
    event.preventDefault(); // Prevent page reload on form submission

    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/users/", {
        email: email,
        username: username,
        password: password,
      });

      // Handle successful registration
      if (response.status === 201) {
        alert("Registration successful! Please log in.");
        navigate("/");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
        alert(`Registration failed: ${error.response.data.detail || "Check your input."}`);
      } else {
        console.error("Error:", error.message);
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="wrapper">
      <div className="col">
        <form className="form" onSubmit={clickRegister}>
          <div className="form-block">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-block">
            <label className="form-label">Username</label>
            <input
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-block">
            <label className="form-label">Password:</label>
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="form-btn">
            Register
          </button>
        </form>
        Already have an account? <Link to={"/login"}>Login</Link>
      </div>
    </div>
  );
};

export default Registration;
