import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import isValidEmail from "pragmatic-email-regex";
import "./Login.css";

export default class Login extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
    this.login = this.login.bind(this);
    this.changeLoggedIn = this.changeLoggedIn.bind(this);
  }

  changeLoggedIn(){
    this.setState({ isLoggedIn: true })
  }
  
  login(e) {

    // prevents refreshing
    e.preventDefault();

    // saves input to the credentials object
    const credentials = {
      email: document.getElementById("login-email").value,
      password: document.getElementById("login-password").value
    }

     // checks if any field is empty
     if(Object.values(credentials).indexOf("") > -1){
      alert("Please fill out all fields before logging in.")
      return
    }

    // checks if email is valid
    if(!isValidEmail(credentials.email)){
      alert("Please enter a valid email.")
      return
    }

    // sends a POST request to the server
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
        if (!body.success){
          alert("Failed to login! Your email or password is incorrect.")
        }
        else {
          
          // creates a cookie storing token info
          const cookies = new Cookies();
          cookies.set(
            "authToken",
            body.token,
            {
              path: "localhost:3001/",
              age: 60*60,
              sameSite: "lax"
            });
            
            // saves the user's id, first name, and complete name
            localStorage.setItem("id", body.id);
            localStorage.setItem("username", body.username);
            localStorage.setItem("cname", body.cname);
            
            alert("Successfully logged in!");
            this.changeLoggedIn();
        }
      })
  }

  render() {

    // renders the feed when user is logged in
    if(this.state.isLoggedIn){
      return <Navigate to="/feed" />
    }

    // renders the login form to retrieve user email and password
    return (
      <div className="login-horizontal">
        <div className="login-vertical">
          <div className="login-title">Log In</div>
          <form className="login-form">
            <input
              type="email"
              id="login-email"
              placeholder="Email"
              className="login-input"
            />
            <div className="email-prompt">
            </div>
            <br/>
            <input
              type="password"
              id="login-password"
              placeholder="Password"
              className="login-input"
            />
            <br/>
            <button id="login-button" onClick={this.login}>Log In</button>
          </form>
          <a href="/signup">Sign up for BlueBook</a>
          </div>
      </div>
    )
  }
}