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
  try {
    let response = await axios.get(`${userUrl}/${params.userId}`, {
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
  try {
    let response = await axios.put(`${userUrl}${params.userId}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
      body: JSON.stringify(user),
    });
    return response;
  } catch (err) {
    console.log("update error", err);
  }
};

const remove = async (params, credentials, user) => {
  try {
    let response = await axios.delete(`${userUrl}/${params.userId}`, {
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
