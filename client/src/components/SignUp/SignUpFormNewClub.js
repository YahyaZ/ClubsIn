import React, { Component } from "react";
import { FaUniversity} from "react-icons/fa";
import { FormGroup, InputGroup, FormControl, ControlLabel } from "react-bootstrap";



class SignUpFormNewClub extends Component{    

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
            <form className="form-body" onSubmit={this.props.buttonClick}>
                <FormGroup controlId="universityControlsSelect">
                <InputGroup>
                        <InputGroup.Addon><FaUniversity/></InputGroup.Addon>
                        {this.state.fetched?
                            <FormControl    componentClass="select" 
                                            placeholder="University/College" 
                                            onChange={e => this.props.handleInputChange({university:e.target.value})}>
                                <option readOnly disabled key={-1} >Select a University</option>
                                {this.state.universities.map(function(uni){
                                    return <option key={uni._id} value = {uni._id}>{uni.name}</option>
                                })}
                            </FormControl>
                    
                            :  <FormControl readOnly type="text" placeholder="Loading..."/>
                        }
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <InputGroup>
                        <InputGroup.Addon><FaUniversity/></InputGroup.Addon>
                        <FormControl    type="text" 
                                        placeholder="Club Name" 
                                        name="clubName" 
                                        onChange={e => this.props.handleInputChange({name:e.target.value})}/>
                    </InputGroup>
                </FormGroup>
                <FormGroup controlId="clubTypeControlsSelect">
                    <InputGroup>
                        <InputGroup.Addon><FaUniversity/></InputGroup.Addon>
                        <FormControl    componentClass="select" 
                                        placeholder="Club Type" 
                                        name="clubType"
                                        onChange={e => this.props.handleInputChange({type:e.target.value})}>
                            <option value="Religious">Religious </option>
                            <option value="Faculty">Faculty </option>
                            <option value="Culture">Culture </option>
                            <option value="Sports">Sports </option>
                            <option value="Gaming">Gaming</option>
                            <option value="Creative">Creative</option>
                            <option value="Politcal">Politcal </option>
                            <option value="Social Justice">Social Justice</option>
                        </FormControl>    
                    </InputGroup>
                </FormGroup>
                <button className="form-button" type="submit">Continue</button>
            </form>
        )
    }
}

export default SignUpFormNewClub;