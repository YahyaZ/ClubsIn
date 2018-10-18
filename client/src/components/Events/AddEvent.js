import React, { Component } from 'react';
import {
    Button,
    ControlLabel,
    FormControl,
    FormGroup,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import RingLoader from 'react-spinners/RingLoader';
import Error from '../../Error';

/* Form used to add/edit an event */
class AddEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            date: moment(),
            message: '',
            loading: false,
        };

        this.addEvent = this.addEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    componentDidMount() {
        const { edit } = this.props;
        if (edit) {
            const { name, description, date } = this.props;
            this.setState({
                name,
                description,
                date: moment(date),
            });
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleDateChange(date) {
        this.setState({ date });
    }

    // Add event to database, then depending redirect or update depending on add or edit
    addEvent(method) {
        const self = this;
        const { match, edit, _id, getEvent } = this.props; // eslint-disable-line
        const userId = JSON.parse(localStorage.getItem('User'))._id;
        const fields = {
            _id,
            clubId: match.params.clubId,
            name: self.state.name,
            description: self.state.description,
            date: moment(self.state.date).toISOString(), // we store dates as ISO format
            createdBy: userId,
        };
        self.setState({ loading: true });
        fetch('/api/event', {
            method,
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fields),
        }).then((response) => {
            if (response.status === 200) {
                self.setState({ loading: false });
                if (!edit) {
                    // disable lint as this.props.history is built in
                    // redirect to club events page
                    this.props.history.push(`/club/${match.params.clubId}`); //eslint-disable-line
                } else {
                    // update event on page
                    getEvent();
                }
            } else {
                response.json().then((data) => {
                    self.setState({ message: Error[data.error], loading: false });
                });
            }
        });
    }

    render() {
        const {
            name,
            date,
            description,
            message,
            loading,
        } = this.state;
        // ignore as match in in-built prop
        const { match, edit } = this.props; // eslint-disable-line
        const method = edit ? 'PUT' : 'POST';
        return (
            <div className="events-container" style={{ width: '100%' }}>
                <h2>{edit ? 'Edit event' : 'Add event'}</h2>
                {message}
                <FormGroup controlId="formName">
                    <ControlLabel>Name:</ControlLabel>
                    <FormControl
                        type="text"
                        value={name}
                        placeholder="Name of the event"
                        name="name"
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="formDescription">
                    <ControlLabel>Description:</ControlLabel>
                    <FormControl
                        type="textarea"
                        value={description}
                        placeholder="Description of the event"
                        name="description"
                        componentClass="textarea"
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="formDate">
                    <ControlLabel>Date:</ControlLabel>
                    <br />
                    <SingleDatePicker
                        readOnly
                        block
                        numberOfMonths={1}
                        date={date}
                        onDateChange={newDate => this.handleDateChange(newDate)}
                        // focused needs to be referenced this way for onFocusChange to work
                        focused={this.state.focused} // eslint-disable-line
                        onFocusChange={({ focused }) => this.setState({ focused })}
                        openDirection="down"
                        displayFormat="DD MMM YYYY"
                        hideKeyboardShortcutsPanel
                    />
                </FormGroup>

                {edit ? '' : (
                    <Link to={{ pathname: `/club/${match.params.clubId}` }}>
                        <Button type="button">Cancel</Button>
                    </Link>
                )}

                <Button type="button" onClick={() => this.addEvent(method)}>{edit ? 'Edit event' : 'Add event'}</Button> <br /><br />
                <RingLoader loading={loading} color="#0B58B6" sizeUnit="px" size={60} inline />
            </div>
        );
    }
}

export default AddEvent;

AddEvent.defaultProps = {
    edit: false,
    name: '',
    description: '',
    date: '',
    getEvent: () => {},
};

AddEvent.propTypes = {
    edit: PropTypes.bool,
    name: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    getEvent: PropTypes.func,
};
