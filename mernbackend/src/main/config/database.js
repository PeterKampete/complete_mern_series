import config from "./config";
import mongoose from "mongoose";

const connect = () => {
  // Connection URL
  mongoose
    .connect(config.mongoUri)
    .then(() => console.log(`connected to database: ${config.mongoUri}`))
    .catch((error) => {
      console.log(error);
      console.log(`unable to connect to database: ${config.mongoUri}`);
    });
};

export default { connect };
