import React from "react";
import "./App.css";
import Login from "./Login";
import Registration from "./Registration";
import NotFound from "./NotFound";
import Home from "./Home";
import Header from "./Header";
import Cookies from "js-cookie";
import { Route, Routes, Navigate } from "react-router-dom";
import TestDetails from "./TestDetails";
import CreateTest from "./CreateTest";

function App() {
  const isLoggedIn = !!Cookies.get("auth_token"); // Check if auth_token exists

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/test/:id" element={<TestDetails />} />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login />} // Redirect if logged in
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/" /> : <Registration />} // Redirect if logged in
        />
        <Route path="/create-test" element={<CreateTest />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
