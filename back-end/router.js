import { signup, login, checkIfLoggedIn, getFriends, getPosts, deletePost, createPost, editPost } from "./controller.js";

const router = (app) => {
  app.get("/getposts", getPosts);
  app.get("/getfriends", getFriends);
  app.post("/signup", signup);
  app.post("/login", login);
  app.post("/checkifloggedin", checkIfLoggedIn);
  app.post("/deletepost", deletePost);
  app.post("/createpost", createPost);
  app.post("/editpost", editPost);
}

export default router;