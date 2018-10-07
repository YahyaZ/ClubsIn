import React, { Component, Fragment } from 'react';
import { Modal, FormControl, Button, Form, Alert } from 'react-bootstrap';


class ExistingClub extends Component {

    constructor(props) {
        super(props);

        this.state = {
            input: '',
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
        e.preventDefault();
        e.stopPropagation();
        let invite= this.state.input;
        fetch('api/club/invite',{
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(invite),
        }).then(
            console.log('done!');
        )
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
                        <Button type="submit">Join</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }

}

export default ExistingClub;


