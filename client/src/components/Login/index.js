import React, { Component } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Form from "../Form";
import { FormGroup, FormControl, InputGroup, Checkbox } from "react-bootstrap";
import { Link } from 'react-router-dom';


const loginApi = "/api/user/login";
class LoginForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            type: 'password',
            message: '',
            input:{
                email: '',
                password:'',
            },
        }
        this.showHidePassword = this.showHidePassword.bind(this);
        this.login = this.login.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount(){
        document.title = "Login - club'in"
    }

    login(e){
        let self = this;
        e.preventDefault();
        console.log(this.state);
        fetch(loginApi,{
            method:"POST",
            mode:"cors",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.input)
        }).then(function(response){
            if(response.status === 400){
                response.json().then(function(data){
                    self.setState({message:data.error});
                });
            } else if (response.status === 200){
                console.log('User logged in');
                console.log(response.json())
                window.location = '/club'
            }
        });
    }
    

    handleInputChange(newPartialInput) {
        this.setState(state => ({
            ...state,
            input:{
                ...state.input,
                ...newPartialInput
            }
                
        }))
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
            <div>
                {this.state.message}
                <form className="form-body" onSubmit={this.login}>
                <FormGroup>
                    <InputGroup>
                        <InputGroup.Addon>
                            <FaEnvelope />
                        </InputGroup.Addon>
                        <FormControl    type="email" 
                                        placeholder="Email Address" 
                                        name="email"
                                        onChange={e => this.handleInputChange({email: e.target.value})}
                                        />
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <InputGroup>
                        <InputGroup.Addon>
                            <FaLock />
                        </InputGroup.Addon>
                        <FormControl    type={this.state.type} 
                                        placeholder="Password" 
                                        name="password" 
                                        onChange={e => this.handleInputChange({password: e.target.value})}
                                        />
                        <InputGroup.Addon onMouseDown={this.showHidePassword} onMouseUp={this.showHidePassword}>
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
                <button type="submit" className="form-button">Log In</button>
                </form>
            </div>
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