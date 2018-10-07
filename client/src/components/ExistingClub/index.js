import React, { Component } from 'react';
import {
    Modal,
    FormControl,
    Button,
    Form,
    Alert,
    FormGroup,
} from 'react-bootstrap';
import BounceLoader from 'react-spinners/BounceLoader';

class ExistingClub extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: '',
            loading: false,
        };

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

    handleSubmit(e) {
        const self = this;
        const { input } = this.state;
        e.preventDefault();
        e.stopPropagation();
        fetch('api/club/invite', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input),
        }).then(() => {
            self.setState({ loading: true });
        });

        /* TODO RAMU: loading:true is for the loading component
         * make it show during api call and turn it off on response */
    }


    render() {
        const {
            show,
            hide,
            copySuccess,
            input,
            loading,
        } = this.state;

        return (
            <Modal show={show} onHide={hide}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter the Invite Code</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {copySuccess && <Alert bsStyle="success">{copySuccess}</Alert>}
                    Please enter the invite code to join a club
                    <Form inline onSubmit={this.handleSubmit}>
                        <FormControl
                            type="text"
                            onChange={e => this.handleInputChange({ input: e.target.value })}
                            value={input}
                            placeholder="Enter Invite Code"
                        />
                        <Button type="submit">Join</Button> {'              '}
                        <FormGroup>
                            <BounceLoader size="20" color="#0B58B6" loading={loading} />
                        </FormGroup>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default ExistingClub;
