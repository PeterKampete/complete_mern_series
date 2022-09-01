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

const EditProfile = () => {
  const classes = useStyles();
  const params = useParams();
  const userData = isAuthenticated();
  const { token, user } = userData.data;

  const { userId } = params;
  const [values, setValues] = useState({
    name: "",
    about: "",
    photo: "",
    email: "",
    password: "",
    redirectToProfile: false,
    error: "",
    id: "",
  });

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
        setValues({
          ...values,
          id: data._id,
          name: data.name,
          email: data.email,
          about: data.about,
        });
      }
    });
  }, [token]);

  const handleSubmit = () => {
    const { name, email, password, about, photo } = values;
    let userData = new FormData();
    name && userData.append("name", name);
    email && userData.append("email", email);
    password && userData.append("password", password);
    about && userData.append("about", about);
    photo && userData.append("photo", photo);

    update(
      {
        userId: userId,
      },
      {
        t: token,
      },
      userData
    ).then(({ data }) => {
      console.log("editData", data);
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, redirectToProfile: true });
      }
    });
  };
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };
  const photoUrl = values.id
    ? `/api/users/photo/${values.id}?${new Date().getTime()}`
    : "/api/users/defaultPhoto";

  if (values.redirectToProfile) {
    return <Navigate to={"/user/" + values.id} />;
  }
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          Edit Profile
        </Typography>
        <Avatar src={photoUrl} className={classes.bigAvatar} />
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
          id="multiline-flexible"
          label="About"
          multiline
          minRows="2"
          value={values.about}
          onChange={handleChange("about")}
          className={classes.textField}
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
