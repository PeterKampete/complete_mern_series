import React from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../../apis/auth/auth-helper";

const PrivateRoute = ({ component: Component, ...rest }) => {
  let location = useLocation();
  <Route
    {...rest}
    element={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Navigate to="/signin" state={{ from: location }} replace />
      )
    }
  />;
};

export default PrivateRoute;
