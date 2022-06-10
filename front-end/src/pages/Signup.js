import React, { Component } from "react";
import isValidEmail from "pragmatic-email-regex";
import "./Signup.css";

export default class Signup extends Component {
  
  constructor(props) {
    super(props);
    this.signup = this.signup.bind(this);
  }

  signup(e) {

    // prevents refreshing
    e.preventDefault();

    // retrieves input and saves to user object
    const user = {
      fname: document.getElementById("signup-fname").value,
      lname: document.getElementById("signup-lname").value,
      email: document.getElementById("signup-email").value,
      password: document.getElementById("signup-password").value
    }

    // checks if any field is empty
    if(Object.values(user).indexOf("") > -1){
      alert("Please fill out all fields before signing up.")
      return
    }

    // checks if email is valid
    if(!isValidEmail(user.email)){
      alert("Please enter a valid email.")
      return
    }

    // POST request to the server
    fetch(
      "http://localhost:3001/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
      .then(response => response.json())
      .then(body => {
        if (body.success) { alert("Successfully saved user!"); }
        else { alert("Failed to save user."); }
      });
  }

  render() {
    return (
      <div className="signup-horizontal">
        <div className="signup-vertical">
          <div className="signup-title">Sign Up</div>
          <form className="signup-form">
            <input
              type="text"
              id="signup-fname"
              placeholder="First name"
              className="signup-input"
            />
            <br/>
            <input
              type="text"
              id="signup-lname"
              placeholder="Last name"
              className="signup-input"
            />
            <br/>
            <input
              type="email"
              id="signup-email"
              placeholder="Email"
              className="signup-input"
            />
            <br/>
            <input
              type="password"
              id="signup-password"
              placeholder="Password"
              className="signup-input"
            />
            <br/>
            <button id="signup-button" onClick={this.signup}> Sign Up </button>
          </form>
          <a href="/login">Already have an account?</a>
        </div>
      </div>
    )
  }
}