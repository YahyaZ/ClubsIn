import React, { Component } from "react";
import { FaUniversity } from "react-icons/fa";
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';

class SignUpFormExistingClub extends Component{
    constructor(props){
        super(props);
        this.state = {
            universities:[],
            fetched:false,
        }
    }

    componentDidMount(){
        let self = this;
        fetch('/api/university')
        .then(response => { return response.json();})
        .then(function(data){
            self.setState({
                universities: data,
                fetched:true,
            })
            
        });
    }
   
    render(){
        return (
            <form className="form-body">
                <FormGroup controlId="universityControlsSelect">
                    <InputGroup>
                        <InputGroup.Addon><FaUniversity/></InputGroup.Addon>
                        {this.state.fetched?
                            <FormControl componentClass="select" 
                                         placeholder="University/College"
                                         onChange={e => this.props.handleInputChange({university:e.target.value})}>
                                {this.state.universities.map(function(uni){
                                    return <option key={uni._id} value={uni._id}>{uni.name}</option>
                                })}
                            </FormControl>
                            :  <FormControl disabled type="text" placeholder="Loading..."/>
                        }
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <InputGroup>
                        <InputGroup.Addon><FaUniversity/></InputGroup.Addon>
                        <FormControl    type="text" 
                                        placeholder="Club Name" 
                                        name="clubName"
                                        onChange={e => this.props.handleInputChange({name:e.target.value})} />
                    </InputGroup>
                </FormGroup>
                <button className="form-button" onClick={this.props.buttonClick}>Continue</button>
            </form>
        )
    }
}

export default SignUpFormExistingClub;