import React from "react";
import "./Posts.css";

export default class Posts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: localStorage.getItem("id"),
            fullname: localStorage.getItem("fullname"),
            posts: []
        }
        this.createPost = this.createPost.bind(this);
        this.editPost = this.editPost.bind(this);
    }

    componentDidMount(){

        fetch("http://localhost:3001/getposts")
        .then(function(response) {
        return response.json();
        })
        .then(body =>{
            this.setState({ posts: body })
        })

    }

    createPost(e){

        e.preventDefault();

        const postInfo = {
            author: this.state.id,
            fullname: this.state.fullname,
            content: document.getElementById("post-content").value
        }

        if(postInfo.content === ""){
            alert("Please input your post content first.")
            return
        }

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

        const editContent = prompt("Enter your edit below:", "")

        if(editContent === ""){
            alert("Please input your post content first.")
            return
        }

        const editInfo = {
            id: post._id,
            content: editContent
        }

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
      
    render(){
        const postList = this.state.posts;
        return(
            <div className="all-posts">
                <form className="form">
                    <input type="text" id="post-content" placeholder="What's on your mind?"/>
                    <div className="button-div">
                        <button className="form-button" onClick={this.createPost}>Post Now</button>    
                    </div>
                </form>
                { postList.map((post) => {
                    if(post.author === this.state.id){
                        return(
                            <div className="posts" key={post._id}>
                                {post.fullname}
                                <div className="timestamp"> {post.timestamp} </div>
                                <div className="post-content">{post.content}</div>
                                <button className="post-button" onClick={()=> this.editPost(post)}>Edit</button>
                                <button className="post-button" onClick={()=> this.delete(post)}>Delete</button>
                            </div> 
                        )
                    }else{
                        return(
                        <div className="posts" key={post._id}>
                            {post.author}
                            <div className="timestamp"> {post.timestamp} </div>
                            <div className="post-content">{post.content}</div>
                        </div>
                        )
                    }
                })}
            </div>
        )
    }
}