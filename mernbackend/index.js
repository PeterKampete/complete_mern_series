import app from "./src/main/app";
import config from "./src/main/config/config";

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});
