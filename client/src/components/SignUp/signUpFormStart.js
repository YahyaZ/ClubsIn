import React, { Component } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { FormGroup, FormControl, InputGroup, Checkbox } from 'react-bootstrap';

class SignUpFormStart extends Component{
   
    render(){
        return (
            <form className="form-body">
                <FormGroup>
                    <InputGroup>
                        <InputGroup.Addon><FaUser/></InputGroup.Addon>
                        <FormControl type="text" placeholder="First Name" name="firstName"/>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <InputGroup>
                        <InputGroup.Addon><FaUser/></InputGroup.Addon>
                        <FormControl type="text" placeholder="Last Name" name="lastName"/>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <InputGroup>
                        <InputGroup.Addon><FaEnvelope/></InputGroup.Addon>
                        <FormControl type="email" placeholder="Email Address" name="email"/>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <InputGroup>
                        <InputGroup.Addon><FaLock/></InputGroup.Addon>
                        <FormControl type="password" placeholder="Password" name="password"/>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <InputGroup>
                        <InputGroup.Addon><FaLock/></InputGroup.Addon>
                        <FormControl type="password" placeholder="Confirm Password" name="confirmPassword"/>
                    </InputGroup>
                </FormGroup>
                <div className="form-body-footer" >
                    <Checkbox name="agreedToTC">
                        I agree to the terms and conditions
                    </Checkbox>
                </div>
                <button className="form-button" onClick={this.props.buttonClick}>Sign Up</button>
            </form>
        )
    }
}

export default SignUpFormStart;