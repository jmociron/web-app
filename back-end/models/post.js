import mongoose from "mongoose";

// creates a schema for the posts model
const PostSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true }, // time of posting
  author: { type: String, required: true }, // user id of poster
  cname: { type: String, required: true }, // complete name of poster
  content: { type: String, required: true } // post content
});

// compiles the Post model
mongoose.model("Post", PostSchema);