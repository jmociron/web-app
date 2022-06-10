import React from 'react';
import "./Posts.css";

export default class Posts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          posts: [],
          username: localStorage.getItem("username"),
          email: localStorage.getItem("email"),
          fullname: localStorage.getItem("fullname")
        }
        this.get = this.get.bind(this);
        this.delete = this.delete.bind(this);
        this.create = this.create.bind(this);
    }

    // sends a GET request when component is mounted
    componentDidMount(){
        this.get();
    }

    // sends a GET request again when a post is modified
    componentDidUpdate(){
        this.get();
    }

    get(){
        fetch('http://localhost:3001/getposts')
        .then(function(response) {
        return response.json();
        })
        .then(body =>{
            this.setState({ posts: body })
        })
    }

    delete(post){
        fetch(
            "http://localhost:3001/deletepost",
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(post)
            })
    }

    create(e){

        // prevents refreshing
        e.preventDefault();

        const post = {
            author: this.state.fullname,
            email: this.state.email,
            content: document.getElementById("post-content").value
        }

        if(post.content === ""){
        alert("Please input your post content first.")
        return
        }
        
        // POST request to the server
        fetch(
        "http://localhost:3001/createpost",
        {
            method: "POST",
            credentials: "include",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
        .then(response => response.json())
        .then(body => {
          if (body.success) { alert("Successfully uploaded post!"); }
          else { alert("Failed to upload post."); }
        });
  }
      
    render(){
        const postList = this.state.posts;
        return(
            <div className="all-posts">
                <form className="form">
                      <input type="text" id="post-content"/>
                      <button className='form-buttons' onClick={this.create}>Post Now</button>
                </form>
                {postList.map((post) => {
                    if(post.email === this.state.email){
                        return <div className="posts" key={post._id}>
                        {post.author} {post.timestamp}
                        <br/>
                        {post.content}
                        <br/>
                        <button className="post-button">Edit</button>
                        <button className="post-button" onClick={()=> this.delete(post)}>Delete</button>
                        </div>
                    }else{
                        return <div className="posts" key={post._id}>
                            {post.author} {post.timestamp}
                            <br/>
                            {post.content}
                            </div>
                    }
                    })}
            </div>
        )
    }
}