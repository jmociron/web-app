import React from "react";
import "./Posts.css";

export default class Posts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: localStorage.getItem("id"),
            cname: localStorage.getItem("cname"),
            posts: [],
            friends: []
        }
        this.createPost = this.createPost.bind(this);
        this.editPost = this.editPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    componentDidMount(){

        // gets all posts on page load
        fetch("http://localhost:3001/getposts")
        .then(function(response) {
        return response.json();
        })
        .then(body =>{
            this.setState({ posts: body })
        })

        const myInfo = {
            myID: this.state.id
        }

        // gets all user's friends on page load
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

    createPost(e){

        e.preventDefault();
        
        // creates object with post info
        const postInfo = {
            author: this.state.id,
            cname: this.state.cname,
            content: document.getElementById("post-content").value
        }
        
        // early return if content is empty
        if(postInfo.content === ""){
            alert("Please input your post content first.")
            return
        }

        // sends a POST request
        fetch(
        "http://localhost:3001/createpost",
        {
            method: "POST",
            credentials: "include",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(postInfo)
        })
        .then(response => response.json())
        .then(body => {
            if (body.success) {
                alert("Successfully uploaded post!");
                window.location.reload();
            }
            else { alert("Failed to upload post."); }
        });

    }

    editPost(post){

        // prompts the user to input their edit through prompt
        const editContent = prompt("Enter your edit below:", "")

        // early return if edit content is empty
        if(editContent === ""){
            alert("Please input your post content first.")
            return
        }

        // creates an object with post info
        const editInfo = {
            id: post._id,
            content: editContent
        }

        // sends a POST request
        fetch(
            "http://localhost:3001/editpost",
            {
                method: "POST",
                credentials: "include",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(editInfo)
            })
            .then(response => response.json())
            .then(body => {
              if (body.success) {
                alert("Successfully edited post!");
                window.location.reload();
            }
              else { alert("Failed to edit post."); }
            });

    }

    deletePost(post){

        // sends a POST request with post as body
        fetch(
            "http://localhost:3001/deletepost",
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(post)
            })
        .then(response => response.json())
        .then(body => {
            if (body.success) {
                alert("Successfully deleted post!");
                window.location.reload();
            }
            else { alert("Failed to delete post."); }
        });

    }

      
    render(){

        const postList = this.state.posts;
        const friendsList = this.state.friends;

        return(

            <div className="all-posts">

                {/* form for creating a new post */}
                <form className="form">
                    <input type="text" id="post-content" placeholder="What's on your mind?"/>
                    <div className="button-div">
                        <button className="form-button" onClick={this.createPost}>Post Now</button>    
                    </div>
                </form>

                { postList.map((post) => {

                    // prints current user's post with edit and delete buttons
                    if(post.author === this.state.id){
                        return(
                            <div className="posts" key={post._id}>
                                {post.cname}
                                <div className="timestamp"> {post.timestamp} </div>
                                <div className="post-content">{post.content}</div>
                                <div className="button-div">
                                    <button className="post-button" onClick={()=> this.editPost(post)}>Edit</button>
                                    <button className="post-button" onClick={()=> this.deletePost(post)}>Delete</button>
                                </div>
                            </div> 
                        )
                    }
                    // prints friends posts without any buttons
                    else if(friendsList.includes(post.author)){
                        return(
                        <div className="posts" key={post._id}>
                            {post.cname}
                            <div className="timestamp"> {post.timestamp} </div>
                            <div className="post-content">{post.content}</div>
                        </div>
                        )
                    }
                    // does not print post if user is not friends with current user
                    else{
                        return <div key={post._id}></div>
                    }
                })}
            </div>
        )
    }
}