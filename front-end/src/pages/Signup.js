import React, { Component } from "react";
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
      fname: document.getElementById("s-fname").value,
      lname: document.getElementById("s-lname").value,
      email: document.getElementById("s-email").value,
      password: document.getElementById("s-password").value
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
        if (body.success) { alert("Successfully saved user"); }
        else { alert("Failed to save user"); }
      });
  }

  render() {
    return (
      <div className="signup-horizontal">
        <div className="signup-vertical">
          <div className="signup-title">Sign Up</div>
          <form className="signup-form">
            <input type="text" id="s-fname" placeholder="First name" className="signup-input"/>
            <br/>
            <input type="text" id="s-lname" placeholder="Last name" className="signup-input"/>
            <br/>
            <input type="text" id="s-email" placeholder="Email" className="signup-input"/>
            <br/>
            <input type="password" id="s-password" placeholder="Password" className="signup-input"/>
            <br/>
            <button id="signup" onClick={this.signup}>Sign Up</button>
          </form>
          <a href="/login">Already have an account?</a>
        </div>
      </div>
    )
  }
}