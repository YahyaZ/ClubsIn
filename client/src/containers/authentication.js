import React, { Component } from "react";
import Form from "../components/Form";
import Login from "../components/Login"
import SignUp from "../components/SignUp"

class Authentication extends Component {
    render() {
        return(
            <div className="form-container">
                <SignUp />  
            </div>
        )
    }
}

export default Authentication;