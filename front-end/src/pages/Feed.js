import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Friends from './Friends';
import "./Feed.css";

export default class Feed extends Component {

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
          <div className="feed">
            <header className="header">
              <div className="header-left">
                Welcome to BlueBook, { this.state.username }
              </div>
              <div className="header-center">
                <input type="text" placeholder="Search"></input>
              </div>
              <div className="header-right">
                <button id="logout" onClick={this.logout}>Log Out</button>
              </div>
            </header> 
            <div className="feed-columns">
              <aside className="left">
                <Friends/>
              </aside>
              <main className="middle">
                Middle
              </main>
              <aside className="right">
                Right
              </aside>
            </div>
          </div>
        )
      }

      else {
        return <Navigate to="/" />
      }
    }
  }
}