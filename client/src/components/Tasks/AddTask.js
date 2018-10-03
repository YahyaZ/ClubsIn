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

class AddTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: moment(),
            name: '',
            description: '',
            selectedAssignee: [],
            assignee: [],
            message: '',
        };

        this.addTask = this.addTask.bind(this);
        this.addToTask = this.addToTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleDateChange(date) {
        this.setState({ date });
    }

    addToTask() {
        const { selectedAssignee } = this.state;
        this.setState({ assignee: selectedAssignee });
    }

    addTask(e) {
        const self = this;
        const { match } = this.props; // eslint-disable-line
        const userId = JSON.parse(localStorage.getItem('User'))._id;

        e.preventDefault();
        const fields = {
            event_id: match.params.eventId,
            created_by: userId,
            due_date: moment(self.state.date).toISOString(),
            name: self.state.name,
            description: self.state.description,
            assignee: self.state.assignee,
        };

        fetch('/api/task', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fields),
        }).then((response) => {
            if (response.status === 400) {
                response.json().then((data) => {
                    self.setState({ message: data.error });
                });
            } else if (response.status === 200) {
                this.props.history.push(`/club/${match.params.clubId}/event/${match.params.eventId}`); // eslint-disable-line
            }
        });
    }

    render() {
        const {
            name,
            date,
            description,
            message,
            assignee,
        } = this.state;

        const { match } = this.props; // eslint-disable-line

        return (
            <div className="events-container">
                <h2>Add task</h2>
                {message}

                <FormGroup controlId="formName">
                    <ControlLabel>Name:</ControlLabel>
                    <FormControl
                        type="text"
                        value={name}
                        placeholder="Name of the task"
                        name="name"
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="formDescription">
                    <ControlLabel>Description:</ControlLabel>
                    <FormControl
                        type="textarea"
                        value={description}
                        placeholder="Description of the task"
                        name="description"
                        componentClass="textarea"
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="formDate">
                    <ControlLabel>Date:</ControlLabel>
                    <DatePicker
                        selected={date}
                        onChange={this.handleDateChange}
                        name="date"
                        placholderText="Due date of the task"
                        showTimeSelect
                        dateFormat="LLL"
                    />
                </FormGroup>
                <FormGroup controlId="formAssign">
                    <ControlLabel>Assign: </ControlLabel>
                    <FormControl componentClass="select" multiple>
                        <option value="select">TODO ADD USERS</option>
                        <option>Test</option>
                    </FormControl>
                    <Button type="button" bsStyle="primary" onClick={this.addToTask}>Add to task</Button>
                </FormGroup>
                <p>Assigned Users: </p>
                {assignee.map(assigned => <p>{assigned}</p>)}

                <Link to={{ pathname: `/club/${match.params.clubId}/event/${match.params.eventId}` }}>
                    <Button type="button">Cancel</Button>
                </Link>
                <Button type="button" onClick={this.addTask}>Add task</Button>
            </div>
        );
    }
}

export default AddTask;
