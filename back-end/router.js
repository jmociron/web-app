import { signup, login, checkIfLoggedIn, getUsers, addFriend, getRequests } from "./controller.js";

const router = (app) => {
  app.post("/signup", signup);
  app.post("/login", login);
  app.post("/checkifloggedin", checkIfLoggedIn);
  app.get("/getusers", getUsers);
  app.post("/addfriend", addFriend);
  app.get("/getrequests", getRequests);
  // app.get("/getposts", getPosts);
  // app.post("/getfriends", getFriends);
  // app.post("/deletepost", deletePost);
  // app.post("/createpost", createPost);
  // app.post("/editpost", editPost);
  // app.post("/acceptrequest", acceptRequest);
  // app.post("/deleterequest", deleteRequest);
  // app.post("/finduser", findUser);
}

export default router;