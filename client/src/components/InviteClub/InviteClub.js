import React, { Component } from 'react';
import {
    Modal,
    FormControl,
    Button,
    Form,
    Alert,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

class InviteClub extends Component {
    constructor(props) {
        super(props);

        this.state = {
            copySuccess: '',
            value: 'Loading...',
            club: {
                link: '',
            },
        };
    }

    componentDidMount() {
        const self = this;
        fetch(`/api/club/${self.props.clubId}`, {
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
        const { show, hide } = this.props;
        const { club, copySuccess, value } = this.state;
        return (
            <Modal show={show} onHide={hide}>
                <Modal.Header closeButton>
                    <Modal.Title>Invite Execs to this Club</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {copySuccess && <Alert bsStyle="success">{copySuccess}</Alert>}
                    Please send the code below to invite another exec into the club
                    <Form inline>
                        <FormControl
                            readOnly
                            inputRef={(ref) => { this.input = ref; }}
                            type="text"
                            value={club.link || value}
                            placeholder="Enter text"
                        />
                        <Button onClick={this.copyToClipboard}>Copy</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default InviteClub;

InviteClub.propTypes = {
    show: PropTypes.bool.isRequired,
    hide: PropTypes.func.isRequired,
};
