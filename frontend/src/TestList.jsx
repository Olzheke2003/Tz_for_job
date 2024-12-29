import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // or use localStorage

const TestList = () => {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate function to redirect

  useEffect(() => {
    // Retrieve the token from cookies (or localStorage)
    const token = Cookies.get("auth_token"); // Change this if you are using localStorage

    if (!token) {
      // If no token, redirect to login page
      navigate("/login");
      return;
    }

    // Fetch the list of tests from the API with the token in the Authorization header
    axios
      .get("http://127.0.0.1:8000/api/tests/", {
        headers: {
          Authorization: `Token ${token}`, // Send the token in the Authorization header
        },
      })
      .then((response) => {
        setTests(response.data); // Assuming the response contains the tests list
      })
      .catch((error) => {
        console.error("Error fetching tests:", error);
      });
  }, [navigate]);

  return (
    <div className="test-list">
      <h2>Available Tests</h2>
      <ul>
        {tests.map((test, index) => (
          <li key={index}>
            {" "}
            {/* Fallback to index if necessary */}
            <Link to={`/test/${test.id}`}>
              <h3>{test.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestList;
