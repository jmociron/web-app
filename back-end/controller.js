import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const User = mongoose.model("User");
const Post = mongoose.model("Post");

const signup = (req, res) => {

  // assigns request body content as user attributes
  const newuser = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    cname: req.body.cname,
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
      const token = jwt.sign(payload, "CMSC100EXER10");

      const id = user._id;
      const fname = user.fname;
      const cname = user.cname;

      return res.send({ success: true, token, id: id, username: fname, cname: cname });

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
    "CMSC100EXER10",

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

const getUsers = (req, res) => {
  User.find(
    (err, users) => { 
      if(err){ console.log(err); }
      else{ 
        res.send(users);
      }
    }
  )
}

const addFriend = (req, res) => {
  User.findOneAndUpdate(
    { _id : req.body.addID },
    { $push: { requests: req.body.myID } },
    (err) => { 
      if (err) { return res.send({ success: false }); }
      else { 
        User.findOneAndUpdate(
          { _id : req.body.myID },
          { $push: { added: req.body.addID } },
          (err) => { 
            if (err) { return res.send({ success: false }); }
            else { return res.send({ success: true }); }
          }
        )
       }
    }
  )
}

const getRequests = (req, res) => {
  User.findOne(
    { _id : req.body.myID },
    (err, user) => { 
      if(err){ console.log(err); }
      else{ 
        res.send(user.requests);
      }
    }
  )

}

const getAdded = (req, res) => {
  User.findOne(
    { _id : req.body.myID },
    (err, user) => { 
      if(err){ console.log(err); }
      else{ 
        res.send(user.added);
      }
    }
  )
}

const acceptRequest = (req, res) => {
  User.findOneAndUpdate(
    { _id : req.body.myID },
    { $push: { friends: req.body.accID }, $pull: { requests: req.body.accID } },
    (err) => { 
      if (err) { return res.send({ success: false }); }
      else { 
        User.findOneAndUpdate(
          { _id : req.body.accID },
          { $push: { friends: req.body.myID }, $pull: { added: req.body.myID } },
          (err) => { 
            if (err) { return res.send({ success: false }); }
            else { return res.send({ success: true }); }
          }
        )
       }
    }
  )
}

const getFriends = (req, res) => {
  User.findOne(
    { _id : req.body.myID },
    (err, user) => { 
      if(err){ console.log(err); }
      else{ 
        res.send(user.friends);
      }
    }
  )
}

const deleteRequest = (req, res) => {
  User.findOneAndUpdate(
    { _id : req.body.myID },
    { $pull: { requests: req.body.delID } },
    (err) => { 
      if (err) { return res.send({ success: false }); }
      else { 
        User.findOneAndUpdate(
          { _id : req.body.accID },
          { $pull: { added: req.body.myID } },
          (err) => { 
            if (err) { return res.send({ success: false }); }
            else { return res.send({ success: true }); }
          }
        )
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

const createPost = (req, res) => {

  console.log(req.body)

  const newpost = new Post({
    timestamp: new Date(),
    author: req.body.author,
    cname: req.body.cname,
    content: req.body.content
  });

  newpost.save((err) => {
    if (err) { return res.send({ success: false }); }
    else {
      console.log("New post created: ");
      console.log(newpost);
      return res.send({ success: true });
    }
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

const deletePost = (req, res) => {
  Post.findOneAndRemove(
    { _id : req.body._id },
    (err) => { 
      if (err) { return res.send({ success: false }); }
      else { return res.send({ success: true }); }
    }
  )
}

const findUser = (req, res) => {
  console.log(req.body)
  User.find(
    { $or:
      [
        { fname : req.body.name },
        { lname: req.body.name },
        { cname: req.body.name }
      ]
    },
    (err, users) => { 
      if(err){ console.log(err); }
      else{
        console.log(users);
        res.send(users);
      }
    }
  )
}

export { signup, login, checkIfLoggedIn, getUsers, addFriend, getRequests, getAdded, acceptRequest, getFriends, deleteRequest, getPosts, createPost, editPost, deletePost, findUser }