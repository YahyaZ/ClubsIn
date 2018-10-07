import React, { Component } from 'react';
import {
    Button,
    ControlLabel,
    FormControl,
    FormGroup,
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import RingLoader from 'react-spinners/RingLoader';


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

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleDateChange(date) {
        this.setState({ date });
    }

    addEvent(e) {
        const self = this;
        const { match } = this.props; // eslint-disable-line
        const userId = JSON.parse(localStorage.getItem('User'))._id;

        e.preventDefault();
        const fields = {
            clubId: match.params.clubId,
            name: self.state.name,
            description: self.state.description,
            date: moment(self.state.date).toISOString(), // we store dates as ISO format
            createdBy: userId,
        };
        self.setState({ loading: true });
        fetch('/api/event', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fields),
        }).then((response) => {
            if (response.status === 400) {
                response.json().then((data) => {
                    self.setState({ message: data.error, loading: false });
                });
            } else if (response.status === 200) {
                // disable lint as this.props.history is built in
                this.props.history.push(`/club/${match.params.clubId}`); //eslint-disable-line
            }
        });
    }

    render() {
        const {
            name,
            description,
            date,
            message,
            loading,
        } = this.state;
        // ignore as match in in-built prop
        const { match } = this.props; // eslint-disable-line

        return (
            <div className="events-container">
                <h2>Add event</h2>
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
                <FormGroup inline controlId="formDate">
                    <ControlLabel>Date:</ControlLabel>
                    <DatePicker
                        selected={date}
                        onChange={this.handleDateChange}
                        name="date"
                        placholderText="Date of the event"
                        showTimeSelect
                        dateFormat="LLL"
                    />
                </FormGroup>

                <Link to={{ pathname: `/club/${match.params.clubId}` }}>
                    <Button type="button">Cancel</Button>
                </Link>
                <Button type="button" onClick={this.addEvent}>Add event</Button> <br /><br />
                <RingLoader loading={loading} color="#0B58B6" sizeUnit="px" size="60" inline />
            </div>
        );
    }
}

export default AddEvent;
