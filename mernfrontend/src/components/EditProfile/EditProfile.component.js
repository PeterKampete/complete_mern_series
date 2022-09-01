import React, { useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
  Icon,
  Avatar,
} from "@material-ui/core";
import FileUpload from "@material-ui/icons/AddPhotoAlternate";
import { Link, useParams, Navigate } from "react-router-dom";
import { isAuthenticated } from "../../apis/auth/auth-helper";
import { useStyles } from "./EditProfile.styles.js";
import { read, update } from "../../apis/user/user";
import { useAuthContext } from "../../Context/useAuthContext";
import defaultPhoto from "../../assets/images/background.jpg";

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
    redirectToProfile: '',
    id: ''
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = () => {
    const jwt = isAuthenticated();
    const { data } = jwt;
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };
    update(
      {
        userId: userId,
      },
      {
        t: data.token,
      },
      user
    ).then(({ data }) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, id: data._id, redirectToProfile: true });
      }
    });
  };
  // const handleChange = (name) => (event) => {
  //   const value = event.target.value;
  //   setValues({ ...values, [name]: value });
  // const value = name === "photo" ? event.target.files[0] : event.target.value;
  // setValues({ ...values, [name]: value });
  // };
  // const photoUrl = values.id
  //   ? `/api/users/photo/${values.id}?${new Date().getTime()}`
  //   : "/api/users/defaultPhoto";

  if (values.redirectToProfile) {
    return <Navigate to={"/user/" + values.id} />;
  }
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          Edit Profile
        </Typography>
        <Avatar className={classes.bigAvatar} />
        <br />
        <input
          accept="image/*"
          onChange={handleChange("photo")}
          className={classes.input}
          id="icon-button-file"
          type="file"
        />
        <label htmlFor="icon-button-file">
          <Button variant="contained" color="default" component="span">
            Upload
            <FileUpload />
          </Button>
        </label>{" "}
        <span className={classes.filename}>
          {values.photo ? values.photo.name : ""}
        </span>
        <br />
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
