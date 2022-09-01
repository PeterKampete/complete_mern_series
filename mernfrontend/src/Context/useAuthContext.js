import { useContext } from "react";
import AuthContext from "./AuthContext";

export const useAuthContext = () => {
  const userData = useContext(AuthContext);

  if(userData === undefined || userData === null) {
    throw new Error("AuthContext Error");
  }

  return userData;
};
