import axios from "axios";

const create = async (user) => {
  try {
    let response = await axios.post("/api/users", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return response.json();
  } catch (err) {
    console.log("creaing user error", err);
  }
};

const list = async (signal) => {
  try {
    let response = await axios.get("/api/users/", {
      signal: signal,
    });
    return response.json();
  } catch (err) {
    console.log("listing user error", err);
  }
};

const read = async (params, credentials, signal) => {
  try {
    let response = await axios.get(`/api/users/${params.userId}`, {
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
    });
    return response.json();
  } catch (err) {
    console.log("reading user error", err);
  }
};

const update = async (params, credentials, user) => {
  try {
    let response = await axios.put(`/api/users/${params.userId}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log('update error', err);
  }
};

const remove = async (params, credentials, user) => {
    try {
      let response = await axios.delete(`/api/users/${params.userId}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${credentials.t}`,
        },
      });
      return await response.json();
    } catch (err) {
      console.log('delete error', err);
    }
  };

export { create, list, read, update, remove };
