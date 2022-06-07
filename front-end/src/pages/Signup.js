import React, { Component } from "react";

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
      <div>
        <h2>Sign Up</h2>
        <form>
          First name: <input type="text" id="s-fname" placeholder="First name" />
          <br/>
          Last name: <input type="text" id="s-lname" placeholder="Last name" />
          <br/>
          E-mail: <input type="text" id="s-email" placeholder="Email" />
          <br/>
          Password: <input type="password" id="s-password" placeholder="Password" />
          <br/>
          <button id="signup" onClick={this.signup}>Sign Up</button>
        </form>
      </div>
    )
  }
}