import React, { Component } from "react";
import Form from "../components/Form";
import Login from "../components/Login"

class Authentication extends Component {
    render() {
        return(
            <div className="form-container">
                <Login />  
            </div>
        )
    }
}

export default Authentication;