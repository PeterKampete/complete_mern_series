import React, { useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
  Icon,
} from "@material-ui/core";
import { Link, useParams, Navigate } from "react-router-dom";
import { isAuthenticated } from "../../apis/auth/auth-helper";
import { useStyles } from "./EditProfile.styles.js";
import { read, update } from "../../apis/user/user";

const EditProfile = () => {
  const classes = useStyles();
  const params = useParams();

  const { userId } = params;
  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    open: false,
    error: "",
    redirectToProfile: false,
  });

  const jwt = isAuthenticated();
  const { token, user } = jwt.data;

  useEffect(() => {
    read(
      {
        userId: userId,
      },
      { t: token }
    ).then(({ data }) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, name: data.name, email: data.email });
      }
    });
  }, [token]);

  const handleSubmit = () => {
    const { name, email, password } = values;
    const user = {
      name,
      email,
      password,
    };
    update(
      {
        userId: userId,
      },
      {
        t: token,
      },
      user
    ).then(({ data }) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        const {name, email} = data;
        setValues({name, email, userId: data._id, redirectToProfile: true });
      }
    });
  };
  const handleChange = name => event => {
    setValues({...values, [name]: event.target.value})
  }

  if (values.redirectToProfile) {
    return <Navigate to={"/user/" + values.userId} />;
  }
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          Edit Profile
        </Typography>
        <TextField
          id="name"
          label="Name"
          className={classes.textField}
          value={values.name}
          onChange={handleChange("name")}
          margin="normal"
        />
        <br />
        <TextField
          id="email"
          type="email"
          label="Email"
          className={classes.textField}
          value={values.email}
          onChange={handleChange("email")}
          margin="normal"
        />
        <br />
        <TextField
          id="password"
          type="password"
          label="Password"
          className={classes.textField}
          value={values.password}
          onChange={handleChange("password")}
          margin="normal"
        />
        <br />{" "}
        {values.error && (
          <Typography component="p" color="error">
            <Icon color="error" className={classes.error}>
              error
            </Icon>
            {values.error}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          variant="contained"
          onClick={handleSubmit}
          className={classes.submit}
        >
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};

export default EditProfile;
