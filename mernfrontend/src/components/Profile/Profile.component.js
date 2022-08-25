import React, { useEffect, useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  IconButton,
  Typography,
  Divider,
} from "@material-ui/core";

import { Edit, Person } from "@material-ui/icons";
import { DeleteUser } from "../../components";
import { isAuthenticated } from "../../apis/auth/auth-helper";
import { read } from "../../apis/user/user";
import { useStyles } from "./Profile.styles.js";

const Profile = () => {
  const classes = useStyles();
  const params = useParams();

  const { userId } = params;
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState([]);
  const [token, setToken] = useState("");
  const [redirectToSignin, setRedirectToSignin] = useState(false);

  useEffect(() => {
    const jwt = isAuthenticated();
    if (!jwt) {
      setRedirectToSignin(true);
    } else {
      const { token, user } = jwt.data;
      setToken(token);
      setUserData(user);
      read(
        {
          userId: userId,
        },
        { t: token }
      ).then(({ data }) => {
        if (data && data.error) {
          setRedirectToSignin(true);
        } else {
          setUser(data);
        }
      });
    }
  }, [userId]);

  if (redirectToSignin) {
    return <Navigate to="/signin" />;
  }

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        Profile
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.email} />
          {userData && userData._id === user._id && (
            <ListItemSecondaryAction>
              <Link to={"/user/edit/" + user._id}>
                <IconButton aria-label="Edit" color="primary">
                  <Edit />
                </IconButton>
              </Link>
              <DeleteUser token={token} userId={user._id} />
            </ListItemSecondaryAction>
          )}
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={"Joined: " + new Date(user.created).toDateString()}
          />
        </ListItem>
      </List>
    </Paper>
  );
};

export default Profile;
