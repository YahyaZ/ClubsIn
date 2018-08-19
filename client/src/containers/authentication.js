import React, { Component } from "react";
import Login from "../components/Login"
import SignUp from "../components/SignUp"

class Authentication extends Component {
    render() {
        return(
            <div className="form-container">
                {this.props.type === 'Sign Up' ? <SignUp /> : <Login /> } 
            </div>
        )
    }
}

export default Authentication;