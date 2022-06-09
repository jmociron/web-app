import React from 'react';
import "./Friends.css";

export default class Friends extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          friends: []
        }
    }

    componentDidMount() {
        
        // retrieves friends from the friends collection
        fetch('http://localhost:3001/getfriends')
        .then(function(response) {
        return response.json();
        })
        .then(body =>{
            console.log(body)
            this.setState({ friends: body })
        })

    }
      
    render(){
        const friendList = this.state.friends;
        return(
            <div className='people'>
                <div className='my-friends'>
                    <b>Friends</b>
                    {friendList.map((friend) => {
                        if(friend.isFriend){
                            return <div className="other-user" key={friend._id}> 
                            <div className="user-name">{friend.fname} <br/> {friend.lname}</div>
                            </div>

                        } else { return <div key={friend._id}></div> }
                    })}
                </div>
                <hr/>
                <div className='my-requests'>
                    <b>Friend Requests</b>
                    {friendList.map((friend) => {
                        if(friend.isFriendRequest){
                            return <div className="other-user" key={friend._id}> 
                            <div className="user-name">{friend.fname} <br/> {friend.lname}</div>
                            <button className="user-button">Confirm</button>
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
                        if(!friend.isFriend && !friend.isFriendRequest){
                            return <div className="other-user" key={friend._id}> 
                            <div className="user-name">{friend.fname} <br/> {friend.lname}</div>
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