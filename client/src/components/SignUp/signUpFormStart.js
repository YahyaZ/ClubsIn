import React, { Component } from 'react';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import {
    FormGroup,
    FormControl,
    InputGroup,
    Checkbox,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

// const signUpApi = 'http://localhost:4000/api/user/signup';

class SignUpFormStart extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        /* let self = this;
        e.preventDefault();
        console.log(this.state);

        fetch(signUpApi,{
            method:"POST",
            mode:"cors",
            credentials:"same-origin",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.input)
        }
        )
        .then(function(response){
            if(response.status === 400){
                response.json().then(function(data){
                    self.setState({message:data.error})
                })
            } else if (response.status === 200){
                console.log('User Added');
                self.props.buttonClick();
            }
        }
        ) */
    }

    render() {
        const { message, buttonClick, handleInputChange } = this.props;
        return (
            <div>
                {message}
                <form className="form-body" onSubmit={buttonClick}>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon><FaUser /></InputGroup.Addon>
                            <FormControl
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
                    <div className="form-body-footer">
                        <Checkbox name="agreedToTC">
                            I agree to the terms and conditions
                        </Checkbox>
                    </div>
                    <button type="submit" className="form-button">Sign Up</button>
                </form>
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
