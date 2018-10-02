import React, { Component } from 'react';
import {
    FaEnvelope,
    FaLock, FaEye,
    FaEyeSlash,
} from 'react-icons/fa';
import {
    FormGroup,
    FormControl,
    InputGroup,
    Checkbox,
} from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

/* API URL for changing password */
const updateApi = '/api/user/update';

class ChangePasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'password',
            message: '',
            input: {
                email: '',
                password: '',
                newPassword: '',
                confirmPassword: ''
            },
            redirect: false,
        };

        this.showHidePassword = this.showHidePassword.bind(this);
        this.update = this.update.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    componentDidMount(){
        //document.title = 'Change Password - club\'in';
    }

    update(e){
        const self = this;
        const { input, message } = this.state;
        e.preventDefault();
        const matches = input.newPassword === input.confirmPassword;
        const emailVal = input.email == '';
        if(!matches || emailVal) {
            this.setState((state) => {
                return {message: "Passwords don't match"};
            })
        } else { 
            this.setState((state) => {
                return {message: ""};
            })
            fetch(updateApi, {
                method: 'PUT',
                mode: 'cors',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(input),
            }).then((response) => {
                if(response.status === 400) {
                    response.json().then((data) => {
                        self.setState({ message: data.error });
                    });
                } else if (response.status === 200) {
                    response.json().then(data => {
                        localStorage.setItem('User', JSON.stringify(data));
                        self.setState({ redirect: true });
                        this.setState((state) => {
                            return {message: "Password Updated!"};
                        })
                    })
                }
            });
        }
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
                ...newPartialInput,
            },
        }));
    }

    showHidePassword(e) {
        e.preventDefault();
        e.stopPropagation();
        const {type} = this.state;
        this.setState({
            type: type === 'input' ? 'password' : 'input',
        });
    }

    render() {
        const { message, type } = this.state;
        // If Redirect is true, redirect the page to the club page
        return (
            <div>
                <label className="form-header" >{message} </label>
                <form className="form-body" onSubmit={this.update}>
                    <FormGroup>
                        <InputGroup>
                            <FormControl
                                type="email"
                                placeholder="Email Address"
                                name="email"
                                onChange={e => this.handleInputChange({ email: e.target.value })}
                            />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <FormControl
                                type={type}
                                placeholder="Password"
                                name="password"
                                onChange={e => this.handleInputChange({ password: e.target.value })}
                            />
                            <InputGroup.Addon
                                onClick={this.showHidePassword}
                            >
                                {type === 'input' ? <FaEye /> : <FaEyeSlash />}
                            </InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <label name="newPasswordLbl">
                            </label>
                            <FormControl
                                type={type}
                                placeholder="New Password"
                                name="newPassword"
                                onChange={e => this.handleInputChange({ newPassword: e.target.value })}
                            />
                            <InputGroup.Addon
                                onClick={this.showHidePassword}
                            >
                                {type === 'input' ? <FaEye /> : <FaEyeSlash />}
                            </InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <label name="confimrPasswordLbl">
                            </label>
                            <FormControl
                                type={type}
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                onChange={e => this.handleInputChange({ confirmPassword: e.target.value })}
                            />
                            <InputGroup.Addon
                                onClick={this.showHidePassword}
                            >
                                {type === 'input' ? <FaEye /> : <FaEyeSlash />}
                            </InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                    <button  type="submit" className="form-button">Confirm</button>
                </form>
            </div>
        )
    }
}

export default ChangePasswordForm;
