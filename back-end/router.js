import { signup, login, checkIfLoggedIn, getUsers, addFriend, getRequests, getAdded, acceptRequest, getFriends, deleteRequest, getPosts, createPost, editPost, deletePost } from "./controller.js";

const router = (app) => {
  app.post("/signup", signup);
  app.post("/login", login);
  app.post("/checkifloggedin", checkIfLoggedIn);
  app.get("/getusers", getUsers);
  app.post("/addfriend", addFriend);
  app.post("/getrequests", getRequests);
  app.post("/getadded", getAdded);
  app.post("/acceptrequest", acceptRequest);
  app.post("/getfriends", getFriends);
  app.post("/deleterequest", deleteRequest);
  app.get("/getposts", getPosts);
  app.post("/createpost", createPost);
  app.post("/editpost", editPost); 
  app.post("/deletepost", deletePost);
  // app.post("/finduser", findUser);
}

export default router;