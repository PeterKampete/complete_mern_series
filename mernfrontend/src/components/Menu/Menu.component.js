import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { clearJWT, isAuthenticated } from "../../apis/auth/auth-helper";

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = isAuthenticated();
  console.log(data);
  const isActive = (location, path) => {
    if (location.pathname === path) return { color: "#ff4081" };
    else return { color: "#ffffff" };
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          MERN Skeleton
        </Typography>
        <Link to="/">
          <IconButton aria-label="Home" style={isActive(location, "/")}>
            <HomeIcon />
          </IconButton>
        </Link>
        <Link to="/users">
          <Button style={isActive(location, "/users")}>Users</Button>
        </Link>
        {!isAuthenticated() && (
          <span>
            <Link to="/signup">
              <Button style={isActive(location, "/signup")}>Sign up</Button>
            </Link>
            <Link to="/signin">
              <Button style={isActive(location, "/signin")}>Sign In</Button>
            </Link>
          </span>
        )}
        {isAuthenticated() && (
          <span>
            <Link to={"/user/" + data.user._id}>
              <Button style={isActive(location, "/user/" + data.user._id)}>
                My Profile
              </Button>
            </Link>
            <Button
              color="inherit"
              onClick={() => {
                clearJWT(() => navigate("/"));
              }}
            >
              Sign out
            </Button>
          </span>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
