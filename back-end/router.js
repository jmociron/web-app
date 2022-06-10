import { signup, login, checkIfLoggedIn, getFriends, getPosts, deletePost, deleteRequest } from "./controller.js";

const router = (app) => {
  app.post("/signup", signup);
  app.post("/login", login);
  app.post("/checkifloggedin", checkIfLoggedIn);
  app.get("/getfriends", getFriends);
  app.get("/getposts", getPosts);
  app.post("/deletepost", deletePost);
  app.post("/deleterequest", deleteRequest);
}

export default router;