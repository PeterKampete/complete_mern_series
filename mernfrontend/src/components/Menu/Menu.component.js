import React, { useEffect, useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { clearJWT, isAuthenticated } from "../../apis/auth/auth-helper";

const Menu = () => {
  const { user } = useContext();
  console.log("the user", user);
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [authData, setAuthData] = useState();
  const location = useLocation();
  useEffect(() => {
    let jwtData = isAuthenticated();
    if (jwtData) {
      setAuthData(jwtData);
      const { user } = jwtData.data;
      const anId = user._id;
      setId(anId);
    } else setAuthData(null);
  }, []);
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
