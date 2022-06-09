import { signup, login, checkIfLoggedIn, getFriends, getPosts } from "./controller.js";

const router = (app) => {
  app.post("/signup", signup);
  app.post("/login", login);
  app.post("/checkifloggedin", checkIfLoggedIn);
  app.get("/getfriends", getFriends);
  app.get("/getposts", getPosts);
}

export default router;