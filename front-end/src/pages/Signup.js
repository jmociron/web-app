import React, { Component } from "react";
import isValidEmail from "pragmatic-email-regex";
import { validatePassword } from "../validator"
import "./Signup.css";

export default class Signup extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      pw1: "",
      pw2: ""
    }
    this.signup = this.signup.bind(this);
    this.changeFname = this.changeFname.bind(this);
    this.changeLname = this.changeLname.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePW1 = this.changePW1.bind(this);
    this.changePW2 = this.changePW2.bind(this);
  }

  signup(e) {

    // prevents refreshing
    e.preventDefault();

    var fname = this.state.fname;
    var lname = this.state.lname;
    var cname = fname.concat(" ", lname)

    
    // retrieves input and saves to user object
    const user = {
      fname: fname,
      lname: lname,
      cname: cname,
      email: this.state.email,
      password: this.state.pw1,
      repeat: this.state.pw2
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

  changeFname(e){
    this.setState({ fname: e.target.value })
  }

  changeLname(e){
    this.setState({ lname: e.target.value })
  }

  changeEmail(e){
    this.setState({ email: e.target.value })
  }

  changePW1(e){
    this.setState({ pw1: e.target.value })

    if(validatePassword(e.target.value)){
        document.getElementById("signup-pw2").disabled = false;
    } else {
        document.getElementById("signup-pw2").disabled = true;
    }

  } 

  changePW2(e){
      this.setState({ pw2: e.target.value })
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
              value={this.state.fname}
              onChange={this.changeFname}
            />
            <br/>
            <input
              type="text"
              id="signup-lname"
              placeholder="Last name"
              className="signup-input"
              value={this.state.lname}
              onChange={this.changeLname}
            />
            <br/>
            <input
              type="email"
              id="signup-email"
              placeholder="Email"
              className="signup-input"
              value={this.state.email}
              onChange={this.changeEmail}
            />
            <div className="signup-guide">
              { isValidEmail(this.state.email) || this.state.email === "" ? "" : "Please input a valid email." }
            </div>
            <br/>
            <input
              type="password"
              placeholder="Password"
              className="signup-input"
              value={this.state.pw1}
              onChange={this.changePW1}
            />
            <div className="signup-guide">
              { validatePassword(this.state.pw1) || this.state.pw1 === "" ? "" : " Please input a valid password." }
            </div>
            <br/>
            <input
              type="password"
              id="signup-pw2"
              placeholder="Password"
              className="signup-input"
              value={this.state.pw2}
              onChange={this.changePW2}
              disabled={true}
            />
            <br/>
            <div className="signup-guide">
              { this.state.pw1 !== this.state.pw2 && validatePassword(this.state.pw1) ? " Passwords do not match." : ""}
            </div>
            <button id="signup-button" onClick={this.signup}> Sign Up </button>
          </form>
          <a href="/login">Already have an account?</a>
        </div>
      </div>
    )
  }
}