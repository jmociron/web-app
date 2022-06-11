import React from "react";
import "./Friends.css";

export default class users extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: localStorage.getItem("id"),
            users: []
        }
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
                                    <button className="user-buttons">Add Friend</button>
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