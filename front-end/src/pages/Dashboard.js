import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      checkedIfLoggedIn: false,
      isLoggedIn: null,
      username: localStorage.getItem("username")
    }

    this.logout = this.logout.bind(this);
  }

  componentDidMount() {

    fetch("http://localhost:3001/checkifloggedin",
      {
        method: "POST",
        credentials: "include"
      })
      .then(response => response.json())
      .then(body => {
        if (body.isLoggedIn) {
          this.setState({ checkedIfLoggedIn: true, isLoggedIn: true, username: localStorage.getItem("username")});
        } else {
          this.setState({ checkedIfLoggedIn: true, isLoggedIn: false });
        }
      });
  }

  logout(e) {

    e.preventDefault();

    const cookies = new Cookies();
    cookies.remove("authToken");
    
    localStorage.removeItem("username");

    this.setState({ isLoggedIn: false });

  }

  render() {

    if (!this.state.checkedIfLoggedIn) {
      return (<div></div>)
    }

    else {

      if (this.state.isLoggedIn) {
        return (
          <div>
            Welcome to the Dashboard, { this.state.username }
            <br/>
            <button id="logout" onClick={this.logout}>Log Out</button>
          </div> 
        )
      }

      else {
        return <Navigate to="/" />
      }
    }
  }
}