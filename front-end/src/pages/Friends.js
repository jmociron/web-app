import React from "react";
import "./Friends.css";

export default class Friends extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          friends: []
        }
        this.accept = this.accept.bind(this)
    }

    componentDidMount() {
        
        // retrieves friends from the friends collection
        fetch("http://localhost:3001/getfriends")
        .then(function(response) {
        return response.json();
        })
        .then(body =>{
            this.setState({ friends: body })
        })

    }

    accept(friend){
        fetch(
            "http://localhost:3001/acceptrequest",
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(friend)
            })
        .then(response => response.json())
        .then(body => {
            if (body.success) {
                alert("Successfully accepted friend request!");
                window.location.reload();
            }
            else { alert("Failed to accept friend request."); }
        });
    }
      
    render(){
        const friendList = this.state.friends;
        return(
            <div className="people">
                <div className="my-friends">
                    <b>Friends</b>
                    {friendList.map((friend) => {
                        var fname = friend.fname
                        var lname = friend.lname
                        var fullName = fname.concat(" ", lname)
                        if(friend.isFriend){
                            return <div className="other-user" key={friend._id}> 
                            <div className="user-name">{fullName}</div>
                            </div>
                        } else { return <div key={friend._id}></div> }
                    })}
                </div>
                <hr/>
                <div className="my-requests">
                    <b>Friend Requests</b>
                    {friendList.map((friend) => {
                        var fname = friend.fname
                        var lname = friend.lname
                        var fullName = fname.concat(" ", lname)
                        if(friend.isFriendRequest){
                            return <div className="other-user" key={friend._id}> 
                            <div className="user-name">{fullName}</div>
                            <button className="user-button" onClick={()=> this.accept(friend)}>Accept</button>
                            <button className="user-button">Delete</button>
                            </div>
                        } else { 
                            return <div key={friend._id}></div>
                        }
                    })}
                </div>
                <hr/>
                <div className="explore-users">
                    <b>Explore</b>
                    {friendList.map((friend) => {
                        var fname = friend.fname
                        var lname = friend.lname
                        var fullName = fname.concat(" ", lname)
                        if(!friend.isFriend && !friend.isFriendRequest){
                            return <div className="other-user" key={friend._id}> 
                            <div className="user-name">{fullName}</div>
                            <button className="user-button">Add Friend</button>
                            </div>
                        } else { 
                            return <div key={friend._id}></div>
                        }
                    })}
                </div>

            </div>
        )
    }
}