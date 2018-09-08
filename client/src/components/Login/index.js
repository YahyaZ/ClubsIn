import React, { Component } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Form from "../Form";
import { FormGroup, FormControl, InputGroup, Checkbox } from "react-bootstrap";
import { Link, Redirect } from 'react-router-dom';

/** API URL for logging on */
const loginApi = "/api/user/login";

/**Login Form Component */
class LoginForm extends Component {

    constructor(props) {
        super(props);
        // Sets the initial state of the component
        /**
         * Type - The input type for the password field. It checks whether the password should be displayed or not
         * Message - Any Error Message that may come up
         * Input.email - The text in the email field
         * Input.password - The text in the password field
         * Redirect - Whether the page should redirect to Sign Up page
         */
        this.state = {
            type: 'password',
            message: '',
            input: {
                email: '',
                password: '',
            },
            redirect: false,
        }

        // Binds the methods to this current component
        this.showHidePassword = this.showHidePassword.bind(this);
        this.login = this.login.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        // Change the title to be Login - Club in
        document.title = "Login - club'in"
    }

    /**
     * Logs the User in
     * @param {Object} e Event Object
     */
    login(e) {
        // Sets the variable of self so it is bound to the login object
        let self = this;
        e.preventDefault();

        // Calls the login api with this details in the form
        fetch(loginApi, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.input)
        }).then(function (response) {
            // Some sort of error in the User field
            if (response.status === 400) {
                response.json().then(function (data) {
                    self.setState({ message: data.error });
                });
            } else if (response.status === 200) {
                // User is logged in
                console.log('User logged in');
                self.setState({ redirect: true });
            }
        });
    }

    /**
     * Updates any input change in the Form
     * @param {Object} newPartialInput 
     */
    handleInputChange(newPartialInput) {
        this.setState(state => ({
            ...state,
            input: {
                ...state.input,
                ...newPartialInput
            }

        }))
    }

    /**
     * Changes the input type to password or input
     * @param {Event} e Event
     */
    showHidePassword(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            type: this.state.type === 'input' ? 'password' : 'input'
        })
    }

    render() {
        // If Redirect is true, redirect the page to the club page
        if (this.state.redirect) {
            return <Redirect to='/club' />;
        }
        return (
            <div>
                {this.state.message}
                <form className="form-body" onSubmit={this.login}>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon>
                                <FaEnvelope />
                            </InputGroup.Addon>
                            <FormControl type="email"
                                placeholder="Email Address"
                                name="email"
                                onChange={e => this.handleInputChange({ email: e.target.value })}
                            />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon>
                                <FaLock />
                            </InputGroup.Addon>
                            <FormControl type={this.state.type}
                                placeholder="Password"
                                name="password"
                                onChange={e => this.handleInputChange({ password: e.target.value })}
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
        return (
            // Renders the Form
            <Form formBody={<LoginForm />}
                tagline="Log in to manage your club"
                footerText="Don't have an account yet?"
                footerLinkText="Sign up here"
                footerLink="/signup" />
        )
    }
}

export default Login;