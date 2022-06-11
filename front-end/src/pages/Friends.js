import React from "react";
import "./Friends.css";

export default class users extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: localStorage.getItem("id"),
            users: []
        }
        this.addFriend = this.addFriend.bind(this);
    }

    componentDidMount(){
        fetch("http://localhost:3001/getusers")
        .then(function(response) {
        return response.json();
        })
        .then(body =>{
            this.setState({ users: body })
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

    render(){
        const usersList = this.state.users;
        return(
            <div className="all-users">
                <b className="text-headers">Explore</b>
                {usersList.map((user) => {
                    if(user._id !== this.state.id){
                        return(
                            <div className="user-box" key={user._id}> 
                                <div className="user-name">{user.fname}&nbsp;{user.lname}</div>
                                <div className="button-div">
                                    <button className="user-buttons" onClick={()=> this.addFriend(user)}>Add Friend</button>
                                </div>
                            </div>
                        )
                    } else {
                        return(
                            <div key={user._id}> </div>
                        )
                    }
                        
                    }
                )
            }
            </div>
        )
    }
}