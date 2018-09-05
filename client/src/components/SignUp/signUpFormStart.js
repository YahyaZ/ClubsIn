import React, { Component } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { FormGroup, FormControl, InputGroup, Checkbox } from 'react-bootstrap';

const signUpApi = "http://localhost:4000/api/user/signup";

class SignUpFormStart extends Component{
    constructor(props){
        super(props);
        this.state ={
            message:"",
            input:{
                email:'',
                password:'',
                passwordConf:'',
                firstName:'',
                lastName:'',
            }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

   
    handleInputChange(newPartialInput) {
        this.setState(state => ({
            ...state,
            input:{
                ...state.input,
                ...newPartialInput
            }
                
        }))
    }

    handleSubmit(e){
        let self = this;
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
            
        )
    }

    render(){
        return (
            <div>
                {this.state.message}
                <form className="form-body" onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon><FaUser/></InputGroup.Addon>
                            <FormControl    type="text" 
                                            placeholder="First Name" 
                                            name="firstName" 
                                            onChange={e => this.handleInputChange({firstName: e.target.value})}
                                            />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon><FaUser/></InputGroup.Addon>
                            <FormControl    type="text" 
                                            placeholder="Last Name" 
                                            name="lastName"
                                            onChange={e => this.handleInputChange({lastName: e.target.value})}
                                            />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon><FaEnvelope/></InputGroup.Addon>
                            <FormControl    type="email" 
                                            placeholder="Email Address" 
                                            name="email"
                                            onChange={e => this.handleInputChange({email: e.target.value})}
                                            />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon><FaLock/></InputGroup.Addon>
                            <FormControl    type="password" 
                                            placeholder="Password" 
                                            name="password"
                                            onChange={e => this.handleInputChange({password: e.target.value})}/>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon><FaLock/></InputGroup.Addon>
                            <FormControl    type="password" 
                                            placeholder="Confirm Password" 
                                            name="confirmPassword"  
                                            onChange={e => this.handleInputChange({passwordConf: e.target.value})}/>
                        </InputGroup>
                    </FormGroup>
                    <div className="form-body-footer" >
                        <Checkbox name="agreedToTC">
                            I agree to the terms and conditions
                        </Checkbox>
                    </div>
                    <button type="submit" className="form-button"  >Sign Up</button>
                </form>
            </div>
        )
    }
}

export default SignUpFormStart;