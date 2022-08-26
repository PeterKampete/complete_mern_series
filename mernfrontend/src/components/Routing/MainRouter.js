import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../../pages";
import {
  Users,
  Signup,
  Signin,
  Profile,
  EditProfile,
  PrivateRoute,
  Menu,
} from "../../components";
const MainRouter = () => {
  return (
    <>
      <Menu />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/users" element={<Users />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route
          exact
          path="/user/edit/:userId"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route exact path="/user/:userId" element={<Profile />} />
      </Routes>
    </>
  );
};
export default MainRouter;
