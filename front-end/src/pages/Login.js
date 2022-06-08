import React, { Component } from "react";
import Cookies from "universal-cookie";
import "./Login.css";

export default class Login extends Component {
  
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login(e) {

    // prevents refreshing
    e.preventDefault();

    // saves input to credentials object
    const credentials = {
      email: document.getElementById("l-email").value,
      password: document.getElementById("l-password").value
    }

    // POST request to the server
    fetch(
      "http://localhost:3001/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      })
      .then(response => response.json())
      .then(body => {
        if (!body.success) { alert("Failed to log in"); }
        else {
          const cookies = new Cookies();
          cookies.set(
            "authToken",
            body.token,
            {
              path: "localhost:3001/",
              age: 60*60,
              sameSite: "lax"
            });

            localStorage.setItem("username", body.username);
            alert("Successfully logged in");
        }
      })
  }

  render() {
    return (
      <div className="login-horizontal">
        <div className="login-vertical">
          <div className="login-title">Log In</div>
          <form className="login-form">
            <input type="text" id="l-email" placeholder="Email" className="login-input"/>
            <br/>
            <input type="password" id="l-password" placeholder="Password" className="login-input"/>
            <br/>
            <button id="login" onClick={this.login}>Log In</button>
          </form>
          <a href="/signup">Sign up for BlueBook</a>
          </div>
      </div>
    )
  }
}