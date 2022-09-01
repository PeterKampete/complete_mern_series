import { LocalCafe } from "@material-ui/icons";
import axios from "axios";
import { userUrl } from "../../config/endpoints";

const create = async (user) => {
  const data = JSON.stringify(user);
  try {
    let response = await axios.post(userUrl, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response;
  } catch (err) {
    console.log("creaing user error", err);
  }
};

const list = async () => {
  try {
    let response = await axios.get(userUrl);
    return response;
  } catch (err) {
    console.log("listing user error", err);
  }
};

const read = async (params, credentials) => {
  const { userId } = params;
  try {
    let response = await axios.get(`${userUrl}/${userId}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
    });
    return response;
  } catch (err) {
    console.log("reading user error", err);
  }
};

const update = async (params, credentials, user) => {
  const { userId } = params;
  console.log("user the ID", userId);
  try {
    let response = await axios.put(`${userUrl}/${userId}`, user, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
    });
    console.log("updated", response);
    return response;
  } catch (err) {
    console.log("update error", err);
  }
};

const remove = async (params, credentials) => {
  const { userId } = params;
  try {
    let response = await axios.delete(`${userUrl}/${userId}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
    });
    return response;
  } catch (err) {
    console.log("delete error", err);
  }
};

export { create, list, read, update, remove };
