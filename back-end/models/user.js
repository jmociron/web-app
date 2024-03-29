import mongoose from "mongoose";
import bcrypt from "bcrypt";

// creates a schema for the user model
const UserSchema = new mongoose.Schema({
  fname: { type: String, required: true }, // first name
  lname: { type: String, required: true }, // last name
  cname: { type: String, required: true }, // complete name
  email: { type: String, required: true }, // email address
  password: { type: String, required: true }, // password (encrypted)
  friends: { type: [], required: true }, // array of ids (friends)
  added: { type: [], required: true }, // array of ids (outgoing friend requests)
  requests: { type: [], required: true } // array of ids (incoming friend requests)
});

// pre hook for saving and validation
UserSchema.pre("save", function(next) {

  const user = this;

  // runs when password is not modified
  if (!user.isModified("password")) return next();

  // generates a random string (salt) for hashing
  return bcrypt.genSalt((saltError, salt) => {

    if (saltError) { return next(saltError); }

    // hashes the password along with the generated salt 
    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      
      if (hashError) { return next(hashError); }

      // stores the hash as the user"s password
      user.password = hash;
      return next();

    });
  });

});

// function for comparing passwords
UserSchema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, callback);
}

// compiles the User model
mongoose.model("User", UserSchema);