import React, { Component } from 'react';
import {
    FormControl,
    Button,
    ButtonGroup,
    Modal,
} from 'react-bootstrap';
import BarLoader from 'react-spinners/BarLoader';
import PropTypes from 'prop-types';
import './ChangePassword.css';

/* API URL for changing password */
const updateApi = '/api/user/update';
class ChangePasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'password',
            message: '',
            password: '',
            newPassword: '',
            confirmPassword: '',
            show: false,
            loading: false,
        };
        this.showHidePassword = this.showHidePassword.bind(this);
        this.update = this.update.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    update(e) {
        const self = this;
        const {
            password,
            newPassword,
            confirmPassword,
        } = this.state;
        const { email } = this.props;
        const input = {
            email,
            password,
            newPassword,
            confirmPassword,
        };
        e.preventDefault();
        if (newPassword !== confirmPassword || !email) {
            this.setState({
                message: "Passwords don't match",
            });
        } else {
            this.setState({
                message: '',
                loading: true,
            });
            fetch(updateApi, {
                method: 'PUT',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(input),
            }).then((response) => {
                if (response.status === 400) {
                    response.json().then((data) => {
                        self.setState({
                            message: Error.getErrorMessage(data.error),
                            loading: false,
                        });
                    });
                } else if (response.status === 200) {
                    response.json().then((data) => {
                        localStorage.setItem('User', JSON.stringify(data));
                        this.setState({
                            message: 'Password Updated!',
                            loading: false,
                        });
                        setTimeout(this.handleClose, 1000);
                    });
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

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    showHidePassword(e) {
        e.preventDefault();
        e.stopPropagation();
        const { type } = this.state;
        this.setState({
            type: type === 'input' ? 'password' : 'input',
        });
    }

    render() {
        const {
            message,
            type,
            show,
            loading,
        } = this.state;
        // If Redirect is true, redirect the page to the club page
        return (
            <div>
                <Button bsStyle="primary" onClick={this.handleShow}>Change password</Button>
                <Modal show={show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change Password</Modal.Title>
                        <BarLoader
                            loading={loading}
                            width="100"
                            widthUnit="%"
                            height="10"
                            color="#0B58B6"
                        />
                    </Modal.Header>
                    <Modal.Body>
                        <p className="form-header">{message} </p>
                        <form className="form-body" onSubmit={this.update}>
                            <FormControl
                                type={type}
                                placeholder="Password"
                                name="password"
                                required
                                onChange={this.handleInputChange}
                            />
                            <FormControl
                                type={type}
                                placeholder="New Password"
                                name="newPassword"
                                required
                                onChange={this.handleInputChange}
                            />
                            <FormControl
                                type={type}
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                required
                                onChange={this.handleInputChange}
                            />
                            <ButtonGroup vertical block>
                                <Button bsSize="small" bsStyle="link" onClick={this.showHidePassword}>
                                    { type === 'input' ? 'Hide Password' : 'Show Password' }
                                </Button>
                            </ButtonGroup>
                            <ButtonGroup vertical block>
                                <Button type="submit" bsStyle="primary">Confirm</Button>
                            </ButtonGroup>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
export default ChangePasswordForm;

ChangePasswordForm.defaultProps = {
    email: '',
};
ChangePasswordForm.propTypes = {
    email: PropTypes.string,
};
