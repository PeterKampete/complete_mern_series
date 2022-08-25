import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import { Navigate } from "react-router-dom";
import { clearJWT, isAuthenticated } from "../../apis/auth/auth-helper";
import { remove } from "../../apis/user/user";

const DeleteUser = ({ userId, token }) => {
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const clickButton = () => {
    setOpen(true);
  };
  const deleteAccount = () => {
    remove(
      {
        userId: userId,
      },
      { t: token }
    ).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        clearJWT(() => console.log("deleted"));
        setRedirect(true);
      }
    });
  };
  const handleRequestClose = () => {
    setOpen(false);
  };

  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <span>
      <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Delete Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to delete your account.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={deleteAccount}
            color="secondary"
            autoFocus="autoFocus"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
};
DeleteUser.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default DeleteUser;