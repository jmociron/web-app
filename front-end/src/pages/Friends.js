import React from "react";
import "./Friends.css";

export default class users extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: localStorage.getItem("id"),
            users: [],
            requests: [],
            added: [],
            friends: []
        }
        this.addFriend = this.addFriend.bind(this);
        this.acceptRequest = this.acceptRequest.bind(this);
        this.deleteRequest = this.deleteRequest.bind(this);
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

    acceptRequest(friend){
        const acceptInfo = {
            myID: this.state.id,
            accID: friend._id
        }

        fetch(
            "http://localhost:3001/acceptrequest",
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(acceptInfo)
            })
        .then(response => response.json())
        .then(body => {
            if (body.success) {
                alert("Friend request successfully accepted!");
                window.location.reload();
            }
            else { alert("Failed to accept friend request."); }
        });
    }

    deleteRequest(friend){
        
        const deleteInfo = {
            myID: this.state.id,
            delID: friend._id
        }

        fetch(
            "http://localhost:3001/deleterequest",
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(deleteInfo)
            })
        .then(response => response.json())
        .then(body => {
            if (body.success) {
                alert("Friend request successfully rejected!");
                window.location.reload();
            }
            else { alert("Failed to reject friend request."); }
        });
    }

    render(){

        const usersList = this.state.users;
        const requestsList = this.state.requests;
        const addedList = this.state.added;
        const friendsList = this.state.friends;

        return(
            <div className="all-users">
                <b className="text-headers">Friends</b>
                {usersList.map((user) => {
                    if(friendsList.includes(user._id)){
                        return(
                            <div className="user-box" key={user._id}> 
                                <div className="user-name">{user.cname}</div>
                            </div>
                        )
                    } else { return <div key={user._id}> </div> }
   
                })}
                <hr/>
                <b className="text-headers">Incoming Requests</b>
                {usersList.map((user) => {
                    if(requestsList.includes(user._id)){
                        return(
                            <div className="user-box" key={user._id}> 
                                <div className="user-name">{user.cname}</div>
                                <div className="button-div">
                                    <button className="user-buttons" onClick={()=> this.acceptRequest(user)}>Accept</button>
                                    <button className="user-buttons" onClick={()=> this.deleteRequest(user)}>Reject</button>
                                </div>
                            </div>
                        )
                    } else { return <div key={user._id}> </div> }
   
                })}
                <hr/>
                <b className="text-headers">Outgoing Requests</b>
                {usersList.map((user) => {
                    if(addedList.includes(user._id)){
                        return(
                            <div className="user-box" key={user._id}> 
                                <div className="user-name">{user.cname}</div>
                            </div>
                        )
                    } else { return <div key={user._id}> </div> }
   
                })}
                <hr/>
                <b className="text-headers">Explore Users</b>
                {usersList.map((user) => {
                    if(user._id !== this.state.id && !friendsList.includes(user._id) && !addedList.includes(user._id) && !requestsList.includes(user._id)){
                        return(
                            <div className="user-box" key={user._id}> 
                                <div className="user-name">{user.cname}</div>
                                <div className="button-div">
                                    <button className="user-buttons" onClick={()=> this.addFriend(user)}>Add Friend</button>
                                </div>
                            </div>
                        )
                    } else { return <div key={user._id}> </div> }
   
                })}
            </div>
        )
    }
}