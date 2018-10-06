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
    PageHeader,
    Button,
    ButtonGroup
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
            email: '',
            password: '',
            newPassword: '',
            confirmPassword: '',
            redirect: false,
        };

        this.showHidePassword = this.showHidePassword.bind(this);
        this.update = this.update.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        const { user } = this.props;
        if (user) {
            this.setState({
                user,
                email: user.email,
            });
        }
    }

    update(e){
        const self = this;
        const { email, password, newPassword, confirmPassword, message } = this.state;
        const input = {
            email,
            password,
            newPassword,
            confirmPassword,
        };
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

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
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
                <PageHeader>
                    <small className="default">Change Password</small>
                </PageHeader>
                <label className="form-header" >{message} </label>
                <form className="form-body" onSubmit={this.update}>
                    <FormGroup>
                        <InputGroup>
                            <FormControl
                                type={type}
                                placeholder="Password"
                                name="password"
                                required
                                onChange={this.handleInputChange}
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
                                required
                                onChange={this.handleInputChange}
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
                                required
                                onChange={this.handleInputChange}
                            />
                            <InputGroup.Addon
                                onClick={this.showHidePassword}
                            >
                                {type === 'input' ? <FaEye /> : <FaEyeSlash />}
                            </InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                    <ButtonGroup vertical block>
                        <Button  type="submit"  bsStyle="primary" >Confirm</Button>
                    </ButtonGroup>
                </form>
            </div>
        )
    }
}

export default ChangePasswordForm;
