import { signup, login, checkIfLoggedIn } from "./controller.js";

const router = (app) => {
  app.post("/signup", signup);
  app.post("/login", login);
  app.post("/checkifloggedin", checkIfLoggedIn);
  // app.get("/getposts", getPosts);
  // app.get("/getusers", getUsers);
  // app.get("/getrequests", getRequests);
  // app.post("/getfriends", getFriends);
  // app.post("/deletepost", deletePost);
  // app.post("/createpost", createPost);
  // app.post("/editpost", editPost);
  // app.post("/acceptrequest", acceptRequest);
  // app.post("/deleterequest", deleteRequest);
  // app.post("/addfriend", addFriend);
  // app.post("/finduser", findUser);
}

export default router;