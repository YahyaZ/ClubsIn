import React, { Component } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Form from "../Form";
import { FormGroup, FormControl, InputGroup, Checkbox } from "react-bootstrap";
import { Link } from 'react-router-dom';

class LoginForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            type: 'password'
        }
        this.showHidePassword = this.showHidePassword.bind(this);
    }

    componentDidMount(){
        document.title = "Login - club'in"
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
                <FormGroup>
                    <InputGroup>
                        <InputGroup.Addon>
                            <FaEnvelope />
                        </InputGroup.Addon>
                        <FormControl type="email" placeholder="Email Address" name="email"/>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <InputGroup>
                        <InputGroup.Addon>
                            <FaLock />
                        </InputGroup.Addon>
                        <FormControl type={this.state.type} placeholder="Password" name="password" />
                        <InputGroup.Addon onClick={this.showHidePassword}>
                            {this.state.type === 'input' ? <FaEye /> : <FaEyeSlash />}
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                <div className="form-body-footer" >
                    <Checkbox name="rememberMe">
                        Remember Me
                    </Checkbox>
                    <Link to="/forgotten" className="form-bottom-left link">
                        Forgot Password?
                    </Link>
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
                    footerLinkText="Sign up here"
                    footerLink="/signup" />
        )
    }
}

export default Login;