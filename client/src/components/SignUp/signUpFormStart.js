import React, { Component } from 'react';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import {
    FormGroup,
    FormControl,
    InputGroup,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import BarLoader from 'react-spinners/BarLoader';
import { Redirect } from 'react-router-dom';

/* Form for creating a new user */
class SignUpFormStart extends Component {

    constructor(){
        super();
        this.state = {
            input: {
                email: '',
                firstName: '',
                lastName: '',
                password: '',
                passwordConf: '',
            },
            loading: false,
            redirect: false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
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

    /**
     * 
     * @param {obj} e - event object
     * Calls the Sign up api and displays an error if given 
     */
    submitForm(e) {
        e.preventDefault();
        e.stopPropagation();
        const self = this;
        const { input } = this.state;
        const { handleErrorMessage } = this.props;
        self.setState({ loading: true });
        fetch('/api/user/signup', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input),
        }).then((response) => {
            if (response.status === 400) {
                response.json().then((data) => {
                    handleErrorMessage (Error[data.error]);
                });
            } else if (response.status === 200) {
                self.props.childProps.authenticate(true);
                response.json().then((data) => {
                    localStorage.setItem('User', JSON.stringify(data));
                    self.setState({ redirect: true});
                });
            } 
            self.setState({loading:false,});
        });
    }

    render() {
        const { handleInputChange, submitForm } = this;
        const { loading, errorMessage, redirect } = this.state;
        if (redirect) {
            return <Redirect to="/" />;
        }

        return (
            <div>
                <form className="form-body" onSubmit={submitForm}>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon><FaUser /></InputGroup.Addon>
                            <FormControl
                                isRequired
                                type="text"
                                placeholder="First Name"
                                name="firstName"
                                onChange={e => handleInputChange({ firstName: e.target.value })}
                            />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon><FaUser /></InputGroup.Addon>
                            <FormControl
                                type="text"
                                placeholder="Last Name"
                                name="lastName"
                                onChange={e => handleInputChange({ lastName: e.target.value })}
                            />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon><FaEnvelope /></InputGroup.Addon>
                            <FormControl
                                type="email"
                                placeholder="Email Address"
                                name="email"
                                onChange={e => handleInputChange({ email: e.target.value })}
                            />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon><FaLock /></InputGroup.Addon>
                            <FormControl
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={e => handleInputChange({ password: e.target.value })}
                            />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon><FaLock /></InputGroup.Addon>
                            <FormControl
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                onChange={e => handleInputChange({ passwordConf: e.target.value })}
                            />
                        </InputGroup>
                    </FormGroup>
                    <button type="submit" className="form-button">Sign Up</button>
                </form>
                <BarLoader
                                loading={loading}
                                width="480"
                                height="10"
                                color="#0B58B6"
                            /> <br />
            </div>
        );
    }
}

export default SignUpFormStart;

SignUpFormStart.defaultProps = {
    message: '',
};

SignUpFormStart.propTypes = {
    message: PropTypes.string,
    buttonClick: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
};
