import axios from "axios";
import { baseUrl } from "../../config/endpoints";

const signin = async (user) => {
  const data = JSON.stringify(user);
  console.log("user", data);
  try {
    let response = await axios.post(`${baseUrl}/auth/signin`, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // withCredentials: true,
    });
    console.log("sign in response", response);
    return response;
  } catch (err) {
    console.log("sign in error", err);
  }
};

const signout = async () => {
  try {
    let response = await axios.get(`${baseUrl}/auth/signout`);
    return response.json();
  } catch (err) {
    console.log("signout error", err);
  }
};

export { signin, signout };
