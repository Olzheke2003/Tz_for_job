import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="wrapper">
      <div className="col text-center">
        <div className="not-found">NotFound</div>
        <Link to={"/"}>Go back to home</Link>
      </div>
    </div>
  );
};

export default NotFound;
