import axios from "axios";

const signin = async (user) => {
  try {
    let response = await axios.post("/auth/signin", user, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.json();
  } catch (err) {
    console.log("sign in error", err);
  }
};

const signout = async () => {
  try {
    let response = await axios.get("/auth/signout");
    return response.json();
  } catch (err) {
    console.log("signout error", err);
  }
};

export { signin, signout };
