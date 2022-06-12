import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import "./models/user.js";
import "./models/post.js";
import router from "./router.js";

// connects to the EXER10 databse on default port 27017
mongoose.connect(
  
  "mongodb://localhost:27017/EXER10",
  { useNewUrlParser: true, useUnifiedTopology: true },
  
  (err) => {
    if (err) { console.log(err); }
    else { console.log("Successfully connected to Mongo DB!"); }
  }

);

// middleware functions
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// sets up header values for CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Access-Control-Allow-Methods, Origin, Accept, Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// sets up routes from router.js
router(app);

// creates server that listens on port 3001
app.listen(3001, (err) => {
  if (err) { console.log(err); }
  else { console.log("Server listening at port 3001."); }
});