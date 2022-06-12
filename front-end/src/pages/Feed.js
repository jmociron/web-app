import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Friends from "./Friends";
import Posts from "./Posts";
import "./Feed.css";
import Search from "./Search";

export default class Feed extends Component {

  constructor(props) {
    super(props);

    this.state = {
      checkedIfLoggedIn: false,
      isLoggedIn: null,
      id: localStorage.getItem("id"),
      username: null
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
    
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    localStorage.removeItem("cname");
    
    alert("Successfully logged out!");
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
              <div className="header-right">
                <button id="logout" className="header-buttons" onClick={this.logout}>Log Out</button>
              </div>
            </header> 
            <div className="feed-columns">
              <aside className="friends-column">
                <Friends/>
              </aside>
              <main className="posts-column">
                <Posts/>
              </main>
              <aside className="search-column">
                  <Search/>
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