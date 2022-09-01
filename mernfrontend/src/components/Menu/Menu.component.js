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
import { useAuthContext } from "../../Context/useAuthContext";

const Menu = () => {
  const { userData } = useAuthContext();
  console.log('userData', userData);
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [authData, setAuthData] = useState(null);
  const location = useLocation();
  useEffect(() => {
    console.log('datatatat', userData)
    if (userData) {
      setAuthData(userData);
      const { user } = userData.data;
      const anId = user._id;
      setId(anId);
    } else {
      setAuthData(null);
    }
  }, [userData]);
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
        {!authData && (
          <span>
            <Link to="/signup">
              <Button style={isActive(location, "/signup")}>Sign up</Button>
            </Link>
            <Link to="/signin">
              <Button style={isActive(location, "/signin")}>Sign In</Button>
            </Link>
          </span>
        )}
        {authData && (
          <span>
            <Link to={"/user/" + id}>
              <Button style={isActive(location, "/user/" + id)}>
                My Profile
              </Button>
            </Link>
            <Button
              color="inherit"
              onClick={() => {
                clearJWT(() => navigate("/"));
                setAuthData(null);
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
