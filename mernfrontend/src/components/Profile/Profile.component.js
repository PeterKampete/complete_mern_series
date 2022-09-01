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
import { read } from "../../apis/user/user";
import { useStyles } from "./Profile.styles.js";
import { useAuthContext } from "../../Context/useAuthContext";
import { isAuthenticated } from "../../apis/auth/auth-helper";

const Profile = () => {
  const classes = useStyles();
  const params = useParams();

  const { userId } = params;
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const [redirectToSignin, setRedirectToSignin] = useState(false);

  useEffect(() => {
    const jwt = isAuthenticated();
    if (jwt) {
      const { data } = jwt;
      setData(data);

      read(
        {
          userId: userId,
        },
        { t: data?.token }
      ).then(({ data }) => {
        if (data && data.error) {
          setRedirectToSignin(true);
        } else {
          setUser(data);
        }
      });
    } else setRedirectToSignin(true);
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
          {data.user && data.user._id === user._id && (
            <ListItemSecondaryAction>
              <Link to={"/user/edit/" + user._id}>
                <IconButton aria-label="Edit" color="primary">
                  <Edit />
                </IconButton>
              </Link>
              <DeleteUser userId={user._id} />
            </ListItemSecondaryAction>
          )}
        </ListItem>
        <ListItem>
          {" "}
          <ListItemText primary={user.about} />{" "}
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
