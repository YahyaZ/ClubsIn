import React, { Component } from "react";

class SignUpFormChooseClubType extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <div>
                <button className="form-button" onClick={this.props.existingClubButtonClick}>Existing Club</button>
                <button className="form-button" onClick={this.props.newClubButtonClick}>Register Club</button>
            </div>
        )
    }
}

export default SignUpFormChooseClubType;