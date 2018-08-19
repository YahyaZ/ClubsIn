import React, { Component } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Form from "../Form";

class LoginForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            type: 'password'
        }
        this.showHidePassword = this.showHidePassword.bind(this);
    }


    showHidePassword (e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            type: this.state.type === 'input' ? 'password' : 'input'
        }) 
    }
    
    render(){
        return (
            <form className="form-body">
                <div className="input-container">
                    <FaEnvelope className="icon"/>
                    <input className="input-field" type="email" placeholder="Email Address" name="email" />
                </div>
                <div className="input-container">
                    <FaLock className="icon"/>
                    <input className="input-field" type={this.state.type} placeholder="Password" name="password" />
                    <div className="icon show-password" onMouseDown={this.showHidePassword} onMouseUp={this.showHidePassword}>
                        {this.state.type === 'input' ? <FaEye /> : <FaEyeSlash />}
                    </div>
                </div>
                <div className="form-body-footer" >
                    <div className="form-checkbox">
                        <input type="checkbox" name="RememberMe" />
                        <label>Remember Me</label>
                    </div>
                    <div className="form-bottom-left link">
                        Forgot Password?
                    </div>
                </div>
                <button className="form-button">Log In</button>
            </form>
        )
}
}

class Login extends Component {
    render() {
        return(
            <Form   formBody={<LoginForm />} 
                    tagline="Log in to manage your club" 
                    footerText="Don't have an account yet?"
                    footerLinkText="Sign up here" />
        )
    }
}

export default Login;