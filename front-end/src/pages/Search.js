import React from "react";
import "./Search.css";


export default class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            results: []
        }
        this.search = this.search.bind(this);
    }

    search(e){
        
        e.preventDefault();

        const result = {
            name: document.getElementById("search-bar").value
        }

        if (result.name === ""){
            alert("Please input a result name before searching.");
            return
        }

        e.preventDefault();

        const user = {
            name: document.getElementById("search-bar").value
        }

        if (user.name === ""){
            alert("Please input a user name before searching.");
            return
        }

        fetch(
            "http://localhost:3001/finduser",
            {
                method: "POST",
                credentials: "include",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            .then(response => response.json())
            .then(body =>{
                if(body.length === 0){
                    alert("User does not exist!")
                }
                this.setState({ results: body })
            })    



    }

    render(){
        const resultList = this.state.results;
        return(
            <div>
            <div className="search-div">
              <input type="text" id="search-bar" placeholder="Search"></input>
              <button id="find" className="search-button" onClick={this.search}>Search</button>
            </div>
            {resultList.map((result) => {
                return <div key={result._id} className="result-box">
                    <div className="result-info">First name: {result.fname}</div>
                    <div className="result-info">Last name: {result.lname}</div>
                    <div className="result-info">Email: {result.email}</div>
                    <div className="button-div">
                        <button className="result-button">Add Friend</button>
                    </div>
                </div>
            })}
        </div>
        )
    }
}