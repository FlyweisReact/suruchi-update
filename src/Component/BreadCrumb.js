/** @format */

import React from "react";
import { Link } from "react-router-dom";

const BreadCrumb = ({ title }) => {
  return (
    <p className="headP">
      <Link to="/dashboard">Dashboard</Link> / {title}{" "}
    </p>
  );
};

export default BreadCrumb;
