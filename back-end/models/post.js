import mongoose from "mongoose";

// creates a schema for the posts model
const PostSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  author: { type: String, required: true },
  cname: { type: String, required: true },
  content: { type: String, required: true }
});

// compiles the Post model
mongoose.model("Post", PostSchema);