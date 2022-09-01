import { useContext } from "react";
import AuthContext from "./AuthContext";

export const useAuthContext = () => {
  const user = useContext(AuthContext);

  if(user === undefined || user === null) {
    throw new Error("AuthContext Error");
  }

  return user;
};
