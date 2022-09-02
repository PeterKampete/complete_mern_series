import { signout } from "./auth";

function authenticate(jwt, cb) {
  localStorage.setItem("jwt", JSON.stringify(jwt));
  cb();
}

function isAuthenticated() {
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else return false;
}

function clearJWT(cb) {
  localStorage.removeItem("jwt");
  cb();
  signout().then((data) => {
    document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  });
}
export { authenticate, isAuthenticated, clearJWT };
