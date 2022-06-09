import mongoose from 'mongoose';

// creates a schema for the friend model
const FriendSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  isFriend: { type: Boolean, required: true },
  isFriendRequest: { type: Boolean, required: true }
});

// compiles the Friend model
mongoose.model("Friend", FriendSchema);