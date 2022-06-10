import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const User = mongoose.model("User");
const Friend = mongoose.model("Friend");
const Post = mongoose.model("Post");

const signup = (req, res) => {

  // assigns request body content as user attributes
  const newuser = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password
  });

  // prints the user on the console
  console.log("New user: ");
  console.log(newuser);

  // saves the user
  newuser.save((err) => {
    if (err) { return res.send({ success: false }); }
    else { return res.send({ success: true }); }
  });

}

const login = (req, res) => {
  
  const email = req.body.email.trim();  // removes whitespace from email
  const password = req.body.password;

  User.findOne({ email }, (err, user) => {

    // early return for error or non-existent user
    if (err || !user) {
      console.log("User does not exist!");
      return res.send({ success: false });
    }

    // early return if passwords do not match
    user.comparePassword(password, (err, isMatch) => {
      if (err || !isMatch) {
        console.log("Password is wrong!");
        return res.send({ success: false });
      }

      console.log("Successfully logged in!");
      
      const payload = {
        _id: user._id
      }

      // initializes a token containing id as payload, and a signature
      const token = jwt.sign(payload, "THIS_IS_A_SECRET_STRING");

      const fname = user.fname;
      const lname = user.lname;
      const fullname = fname.concat(" ", lname);

      return res.send({ success: true, token, username: fname, email: email, fullname: fullname });

    })
  })
}

const checkIfLoggedIn = (req, res) => {

  // early return if no cookies or token
  if (!req.cookies || !req.cookies.authToken) {
    return res.send({ isLoggedIn: false });
  }
  
  // uses the secret string to decode token
  return jwt.verify(

    req.cookies.authToken,
    "THIS_IS_A_SECRET_STRING",

    (err, payload) => {

      if (err) {
        return res.send({ isLoggedIn: false });
      }
      
      // retrieves decoded id from the payload
      const userId = payload._id;
      
      return User.findById(userId, (userErr, user) => {

        // early return for error or non-existent user
        if (userErr || !user) {
          return res.send({ isLoggedIn: false });
        }

        // logs in user when found
        console.log("User is now logged in!");
        return res.send({ isLoggedIn: true });

      });
    });
}

const getFriends = (req, res) => {
  // retrieves all friends
  Friend.find(
    (err, friends) => { 
      if(err){ console.log(err); }
      else{ 
        res.send(friends);
      }
    }
  )
}

const getPosts = (req, res) => {
  Post.find({}).sort({timestamp: -1}).exec(
    (err, posts) => { 
      if(err){ console.log(err); }
      else{ 
        res.send(posts);
      }
  });
}

const deletePost = (req, res) => {
  Post.findOneAndRemove(
    { _id : req.body._id },
    (err) => { 
      if (err) { return res.send({ success: false }); }
      else { return res.send({ success: true }); }
    }
  )
}

const createPost = (req, res) => {

    const newpost = new Post({
      timestamp: new Date(),
      author: req.body.author,
      email: req.body.email,
      content: req.body.content
    });
  
    console.log("New post: ");
    console.log(newpost);
  
    newpost.save((err) => {
      if (err) { return res.send({ success: false }); }
      else { return res.send({ success: true }); }
    });

}

const editPost = (req, res) => {
  Post.findOneAndUpdate(
    { _id : req.body.id },
    { $set: { timestamp: new Date(), content: req.body.content }},
    (err) => { 
      if (err) { return res.send({ success: false }); }
      else { return res.send({ success: true }); }
    }
  )
}

const acceptRequest = (req, res) => {
  Friend.findOneAndUpdate(
    { _id : req.body._id },
    { $set: { isFriend: true, isFriendRequest: false }},
    (err) => { 
      if (err) { return res.send({ success: false }); }
      else { return res.send({ success: true }); }
    }
  )
}

const deleteRequest = (req, res) => {
  Friend.findOneAndUpdate(
    { _id : req.body._id },
    { $set: { isFriendRequest: false }},
    (err) => { 
      if (err) { return res.send({ success: false }); }
      else { return res.send({ success: true }); }
    }
  )
}

const addFriend = (req, res) => {
  Friend.findOneAndUpdate(
    { _id : req.body._id },
    { $set: { isAdded: true }},
    (err) => { 
      if (err) { return res.send({ success: false }); }
      else { return res.send({ success: true }); }
    }
  )
}

export { signup, login, checkIfLoggedIn, getFriends, getPosts, deletePost, createPost, editPost, acceptRequest, addFriend, deleteRequest }