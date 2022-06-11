import React from "react";
import "./Search.css";


export default class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          users: []
        }
        this.search = this.search.bind(this);
    }

    search(e){

        e.preventDefault();

        const user = {
            name: document.getElementById("search-bar").value
        }

        if (user.name === ""){
            alert("Please input a user name before searching.");
            return
        }

        console.log(user)

        fetch(
            "http://localhost:3001/finduser",
            {
                method: "POST",
                credentials: "include",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            .then(response => response.json())
            .then(body =>{
                if(body.length === 0){
                    alert("User does not exist!")
                }
                this.setState({ users: body })
            })              
    }

    render(){
        const userList = this.state.users;
        return(
            <div>
                <div className="search-div">
                  <input type="text" id="search-bar" placeholder="Search"></input>
                  <button id="find" className="search-buttons" onClick={this.search}>Search</button>
                </div>
                {               
                userList.map((user) => {
                    return <div key={user._id} className="user-result">
                        <div className="user-info">First name: {user.fname}</div>
                        <div className="user-info">Last name: {user.lname}</div>
                        <div className="user-info">Email: {user.email}</div>
                        <button className="user-button">Add Friend</button>
                    </div>
                })}
            </div>
        )
    }
}