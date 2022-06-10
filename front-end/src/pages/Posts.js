import React from 'react';
import "./Posts.css";

export default class Posts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          posts: []
        }
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        
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
            .then(response => response.json())
            .then(body => {    
                if (!body.success){ console.log("Failed to delete post.") }
                else { console.log("Post deleted!") }
            })
        
    }
      
    render(){
        const postList = this.state.posts;
        return(
            <div className="all-posts">
                {postList.map((post) => {
                    if(post.author === "Jamie Ciron"){
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