import React, { Component } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

class SignUpFormStart extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <form className="form-body">
                <div className="input-container">
                    <FaUser className="icon"/>
                    <input className="input-field" type="text" placeholder="First Name" name="firstName" />
                </div>
                <div className="input-container">
                    <FaUser className="icon"/>
                    <input className="input-field" type="text" placeholder="Last Name" name="lastName" />
                </div>
                <div className="input-container">
                    <FaEnvelope className="icon"/>
                    <input className="input-field" type="email" placeholder="Email Address" name="email" />
                </div>
                <div className="input-container">
                    <FaLock className="icon"/>
                    <input className="input-field" type="password" placeholder="Password" name="password" />
                </div>
                <div className="input-container">
                    <FaLock className="icon"/>
                    <input className="input-field" type="password" placeholder="Repeat Password" name="repeatPassword" />
                </div>
                <div className="form-body-footer" >
                    <div className="form-checkbox">
                        <input type="checkbox" name="agreedToTermsAndConditions" />
                        <label>I agree to the terms and conditions</label>
                    </div>
                </div>
                <button className="form-button" onClick={this.props.buttonClick}>Sign Up</button>
            </form>
        )
    }
}

export default SignUpFormStart;