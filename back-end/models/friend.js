import mongoose from "mongoose";

// creates a schema for the friend model
const FriendSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  cname: { type: String, required: true },
  email: { type: String, required: true },
  isFriend: { type: Boolean, required: true },
  isFriendRequest: { type: Boolean, required: true },
  isAdded: { type: Boolean, required: true }
});

// compiles the Friend model
mongoose.model("Friend", FriendSchema);