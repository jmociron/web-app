import { signup, login, checkIfLoggedIn, getFriends } from "./controller.js";

const router = (app) => {
  app.post("/signup", signup);
  app.post("/login", login);
  app.post("/checkifloggedin", checkIfLoggedIn);
  app.get("/getfriends", getFriends);
}

export default router;