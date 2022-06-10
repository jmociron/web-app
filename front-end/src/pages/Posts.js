import React from 'react';
import "./Posts.css";

export default class Posts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          posts: [],
          username: localStorage.getItem("username"),
          email: localStorage.getItem("email")
        }
        this.get = this.get.bind(this);
        this.delete = this.delete.bind(this);
    }

    // sends a GET request when component is mounted
    componentDidMount(){
        this.get();
    }

    // sends a GET request again when a post is modified
    componentDidUpdate(){
        this.get();
    }

    // retrives all posts from the EXER10 database
    get(){
        fetch('http://localhost:3001/getposts')
        .then(function(response) {
        return response.json();
        })
        .then(body =>{
            this.setState({ posts: body })
        })
    }

    // deletes a post from the corresponding button clicked
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
      
    render(){
        // creates a list containing all posts retrieved from the db
        const postList = this.state.posts;
        return(
            // renders posts (adds buttons to posts from current user)
            <div className="all-posts">
                {postList.map((post) => {
                    console.log(this.state.email)
                    if(post.author === this.state.username){
                        return <div className="posts" key={post._id}>
                        {post.author} {post.timestamp}
                        <br/>
                        {post.content}
                        <br/>
                        <button className="post-button">Edit</button>
                        <button className="post-button" onClick={()=> this.delete(post)}>Delete</button>
                        </div>
                    }else{
                        return <div className="posts">
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