import React, { Component } from "react";
import { FaUniversity } from "react-icons/fa";
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';

class SignUpFormExistingClub extends Component{
   
    render(){
        return (
            <form className="form-body">
                <FormGroup controlId="universityControlsSelect">
                    <InputGroup>
                        <InputGroup.Addon><FaUniversity/></InputGroup.Addon>
                        <FormControl componentClass="select" placeholder="University/College">
                            <option value="UTS">UTS</option>
                            <option value="UNSW">UNSW</option>
                        </FormControl>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <InputGroup>
                        <InputGroup.Addon><FaUniversity/></InputGroup.Addon>
                        <FormControl type="text" placeholder="Club Name" name="clubName" />
                    </InputGroup>
                </FormGroup>
                <button className="form-button" onClick={this.props.buttonClick}>Continue</button>
            </form>
        )
    }
}

export default SignUpFormExistingClub;