import React from "react";
import "./Search.css";


export default class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: localStorage.getItem("id"),
            results: [],
            requests: [],
            added: [],
            friends: []
        }
        this.search = this.search.bind(this);
    }

    componentDidMount(){

        fetch("http://localhost:3001/getusers")
        .then(function(response) {
        return response.json();
        })
        .then(body =>{
            this.setState({ users: body })
        })

        const myInfo = {
            myID: this.state.id
        }

        fetch(
            "http://localhost:3001/getrequests",
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(myInfo)
            })
        .then(response => response.json())
        .then(body => {
            this.setState({ requests: body })
        })

        fetch(
            "http://localhost:3001/getadded",
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(myInfo)
            })
        .then(response => response.json())
        .then(body => {
            this.setState({ added: body })
        })

        fetch(
            "http://localhost:3001/getfriends",
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(myInfo)
            })
        .then(response => response.json())
        .then(body => {
            this.setState({ friends: body })
        })
    }   

    addFriend(friend){
        const addInfo = {
            myID: this.state.id,
            addID: friend._id
        }

        fetch(
            "http://localhost:3001/addfriend",
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(addInfo)
            })
        .then(response => response.json())
        .then(body => {
            if (body.success) {
                alert("Successfully sent friend request!");
                window.location.reload();
            }
            else { alert("Failed to send friend request."); }
        });
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
                this.setState({ results: body })
            }
        )    

    }

    render(){

        const resultList = this.state.results;
        const requestsList = this.state.requests;
        const addedList = this.state.added;
        const friendsList = this.state.friends;

        return(
            <div>
            <div className="search-div">
              <input type="text" id="search-bar" placeholder="Search"></input>
              <button id="find" className="search-button" onClick={this.search}>Search</button>
            </div>
            {resultList.map((result) => {
                if(result._id !== this.state.id && !friendsList.includes(result._id) && !addedList.includes(result._id) && !requestsList.includes(result._id)){
                    return <div key={result._id} className="result-box">
                    <div className="result-info">First name: {result.fname}</div>
                        <div className="result-info">Last name: {result.lname}</div>
                        <div className="result-info">Email: {result.email}</div>
                        <div className="button-div">
                            <button className="result-button" onClick={()=> this.addFriend(result)}>Add Friend</button>
                        </div>
                    </div>
                } else {
                    return <div key={result._id} className="result-box">
                    <div className="result-info">First name: {result.fname}</div>
                        <div className="result-info">Last name: {result.lname}</div>
                        <div className="result-info">Email: {result.email}</div>
                    </div>
                }
            })}
        </div>
        )
    }
}