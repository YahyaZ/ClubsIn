import React, { Component, Fragment } from 'react';
import { Modal, FormControl, Button, Form, Alert, FormGroup } from 'react-bootstrap';
import BounceLoader from 'react-spinners/BounceLoader';

class ExistingClub extends Component {

    constructor(props) {
        super(props);

        this.state = {
            input: '',
            loading: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Updates any input change in the Form
     * @param {Object} newPartialInput
     */
    handleInputChange(newPartialInput) {
        this.setState(state => ({
            ...state,
            ...newPartialInput,
        }));
    }

    handleSubmit(e){
        const self = this;
        e.preventDefault();
        e.stopPropagation();
        self.setState({loading:true})
        console.log(this.state.input);
        /*TODO RAMU: loading:true is for the loading component
         * make it show during api call and turn it off on response */
    }


    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.hide}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter the Invite Code</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.copySuccess && <Alert bsStyle="success">{this.state.copySuccess}</Alert>}
                    Please enter the invite code to join a club
                    <Form inline onSubmit={this.handleSubmit}>
                        <FormControl 
                            type="text"
                            onChange={e => this.handleInputChange({ input: e.target.value })}
                            value={this.state.input}
                            placeholder="Enter Invite Code"
                        />
                        <Button type="submit">Join</Button> {'              '}
                        <FormGroup>
                            <BounceLoader size="20" color={"#0B58B6"} loading={this.state.loading}/>
                        </FormGroup>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }

}

export default ExistingClub;


