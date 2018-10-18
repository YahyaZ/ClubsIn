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
import PropTypes from 'prop-types';

class ExistingClub extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: '',
            loading: false,
            successMessage: '',
            errorMessage: '',
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
        self.setState({ loading: true, errorMessage: '', successMessage: '' });
        fetch('api/club/invite', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ inviteCode: input }),
        }).then((response) => {
            self.setState({ loading: false });
            if (response.status === 200) {
                self.props.rerender();
                response.json().then((data) => {
                    self.setState({ successMessage: `You are now in ${data.name}!` });
                });
            } else {
                response.json().then((data) => {
                    self.setState({ errorMessage: Error[data.error] });
                });
            }
        });
    }

    render() {
        const {
            input,
            loading,
            errorMessage,
            successMessage,
        } = this.state;

        const {
            show,
            hide,
        } = this.props;

        return (
            <Modal show={show} onHide={hide}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter the Invite Code</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {successMessage && <Alert bsStyle="success">{successMessage}</Alert>}
                    {errorMessage && <Alert bsStyle="danger">{errorMessage}</Alert>}
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

ExistingClub.propTypes = {
    show: PropTypes.bool.isRequired,
    hide: PropTypes.func.isRequired,
};
