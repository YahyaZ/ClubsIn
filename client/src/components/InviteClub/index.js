import React, { Component, Fragment } from 'react';
import { Modal, FormControl, Button, Form, Alert } from 'react-bootstrap';


class InviteClub extends Component {

    constructor(props) {
        super(props);

        this.state = {
            copySuccess: '',
            value: 'Loading...',
            club: {
                link : '',
            }
        }
    }

    componentDidMount(){
        let self = this;
        fetch(`/api/club/${this.props.clubId}`, {
            method: 'GET',
            mode: 'cors',
        }).then((response) => {
            if (response.status === 401) {
                return [];
            }
            return response.json();
        }).then((club) => {
            self.setState({ club });
        });
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
                    {this.state.copySuccess && <Alert bsStyle="success">{this.state.copySuccess}</Alert>}
                    Please send the code below to invite another exec into the club
                    <Form inline>
                        <FormControl readOnly
                            inputRef={(ref) => { this.input = ref }}
                            type="text"
                            value={this.state.club.link || this.state.value}
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