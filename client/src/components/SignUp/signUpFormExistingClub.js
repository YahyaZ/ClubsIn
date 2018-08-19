import React, { Component } from "react";
import { FaUniversity } from "react-icons/fa";

class SignUpFormExistingClub extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <form className="form-body">
                <div className="input-container">
                    <FaUniversity className="icon"/>
                    <select className="input-field" name="university" >
                        <option value="" disabled selected>University/College</option>
                        <option value="UTS">UTS </option>
                        <option value="UNSW">UNSW </option>
                    </select>
                </div>
                <div className="input-container">
                    <FaUniversity className="icon"/>
                    <input className="input-field" type="text" placeholder="Club Name" name="clubName" />
                </div>
                <button className="form-button" onClick={this.props.buttonClick}>Continue</button>
            </form>
        )
    }
}

export default SignUpFormExistingClub;