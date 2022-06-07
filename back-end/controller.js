import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// creates a User using the UserSchema
const User = mongoose.model("User");

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
      console.log("User doesn't exist!");
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

      return res.send({ success: true, token, username: user.name });

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

export { signup, login, checkIfLoggedIn }