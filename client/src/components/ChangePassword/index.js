import React, { Component } from 'react';
import {
    FaEnvelope,
    FaLock, FaEye,
    FaEyeSlash,
} from 'react-icons/fa';
import {
    Form,
    FormGroup,
    FormControl,
    InputGroup,
    Modal,
    Col,
    Button,
    ButtonGroup
} from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

/* API URL for changing password */
const updateApi = '/api/user/update';

class ChangePasswordForm extends Component {
    constructor(props) {
        super(props);
        let user = JSON.parse(localStorage.getItem('User'));
        this.state = {
            user,
            type: 'password',
            message: '',
            input: {
                email: user.email,
                password: '',
                newPassword: '',
                confirmPassword: ''
            },
            show: false,
            redirect: false,
        };
        
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.showHidePassword = this.showHidePassword.bind(this);
        this.update = this.update.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    componentDidMount(){
        //document.title = 'Change Password - club\'in';
    }

    update(e){
        const self = this;
        const { input, message } = this.state;
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
                        setTimeout(this.handleClose, 1000);
                    })
                }
            });
        }
    }

    handleClose() {
        this.setState({ show: false });
      }
    
      handleShow() {
        this.setState({ show: true });
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
    getInitialState(){
        return { showModal: false };
    }
    
    close(){
       this.setState({ showModal: false });
    }
    
    open(){
       this.setState({ showModal: true });
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
        let style = { 
            width: "100%"
        };
        return (
            <div>
                <br/>
                <Button bsStyle="primary"  onClick={this.handleShow}>
                    Change password
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label className="form-header" >{message} </label>
                        <Form horizontal className="form-body" width={style} onSubmit={this.update}>
                            <FormGroup >
                                <InputGroup  style={style}>
                                    <FormControl
                                        type={type}
                                        placeholder="Password"
                                        name="password"
                                        required
                                        onChange={e => this.handleInputChange({ password: e.target.value })}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup >
                                <InputGroup style={style}>
                                    <FormControl
                                        type={type}
                                        placeholder="New Password"
                                        name="newPassword"
                                        required
                                        onChange={e => this.handleInputChange({ newPassword: e.target.value })}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup >
                                <InputGroup style={style}>
                                    <FormControl
                                        type={type}
                                        placeholder="Confirm Password"
                                        name="confirmPassword"
                                        required
                                        onChange={e => this.handleInputChange({ confirmPassword: e.target.value })}
                                    />
                                   <ButtonGroup vertical block>
                                        <Button  bsSize="small" bsStyle="link" onClick={this.showHidePassword}>
                                            {type === 'input' ? ("Hide Password") 
                                            : ("Show Password"  )}
                                        </Button>
                                    </ButtonGroup>
                                </InputGroup>

                            </FormGroup>

                            <br/>
                            <ButtonGroup vertical block>
                                <Button  style={style} type="submit"  bsStyle="primary" >Confirm</Button>
                            </ButtonGroup>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default ChangePasswordForm;
