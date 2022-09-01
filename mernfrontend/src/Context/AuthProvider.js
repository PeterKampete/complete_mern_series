import { useState, useffect, useEffect } from "react";
import { isAuthenticated } from "../apis/auth/auth-helper";
import AuthContext from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(localStorage.getItem("jwt") || null);

  useEffect(() => {
    // const currentUser = getUser();
    const user = localStorage.getItem("jwt")
      ? localStorage.getItem("jwt")
      : null;
    setUserData(user);
  }, []);

  return (
    <AuthContext.Provider value={{ userData }}>{children}</AuthContext.Provider>
  );
};
