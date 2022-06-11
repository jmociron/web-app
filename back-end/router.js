import { signup, login, checkIfLoggedIn, getFriends, getPosts, deletePost, createPost, editPost, acceptRequest, addFriend, deleteRequest, findUser } from "./controller.js";

const router = (app) => {
  app.get("/getposts", getPosts);
  app.get("/getfriends", getFriends);
  app.post("/signup", signup);
  app.post("/login", login);
  app.post("/checkifloggedin", checkIfLoggedIn);
  app.post("/deletepost", deletePost);
  app.post("/createpost", createPost);
  app.post("/editpost", editPost);
  app.post("/acceptrequest", acceptRequest);
  app.post("/deleterequest", deleteRequest);
  app.post("/addfriend", addFriend);
  app.post("/finduser", findUser);
}

export default router;