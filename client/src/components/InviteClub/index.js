import React, { Component, Fragment } from 'react';
import { Modal, FormControl, Button, Form } from 'react-bootstrap';


class InviteClub extends Component {

    constructor(props) {
        super(props);

        this.state = { copySuccess: '',
    value: 'AAWDawd23dwadawdawd3d' }
    }

    copyToClipboard = (e) => {
        this.input.select();
        document.execCommand('copy');
        // This is just personal preference.
        // I prefer to not show the the whole text area selected.
        e.target.focus();
        this.setState({ copySuccess: 'Copied!' });
    };

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.hide}>
                <Modal.Header closeButton>
                    <Modal.Title>Invite Execs to this Club</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Please send the code below to invite another exec into the club
                    <Form inline>
                        <FormControl readOnly
                            inputRef={(ref) => {this.input = ref}}
                            type="text"
                            value={this.state.value}
                            placeholder="Enter text"
                        />
                        <Button onClick={this.copyToClipboard}>Copy</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }

}

export default InviteClub;

