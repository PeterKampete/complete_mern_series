import React from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../../apis/auth/auth-helper";

const PrivateRoute = ({ children, ...rest }) => {
  let location = useLocation();
  if (!isAuthenticated()) {
    <Navigate to="/signin" state={{ from: location }} replace />;
  }
  return children;
};

export default PrivateRoute;
