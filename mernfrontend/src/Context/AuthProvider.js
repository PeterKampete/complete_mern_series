import { useState, useffect, useEffect } from "react";
import { isAuthenticated } from "../apis/auth/auth-helper";
import AuthContext from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // const currentUser = getUser();
    const user = isAuthenticated();
    console.log('currentUser', user);

    setUserData(user);
  }, []);

  return (
    <AuthContext.Provider value={{ userData }}>{children}</AuthContext.Provider>
  );
};
