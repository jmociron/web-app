import React from 'react';
import "./Posts.css";

export default class Posts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          posts: []
        }
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
      
    render(){
        const postList = this.state.posts;
        return(
            <div className="all-posts">
                {postList.map((post) => {
                    return <div className="posts"> {post.author} {post.timestamp}<br/>{post.content} </div>
                    })}
            </div>
        )
    }
}