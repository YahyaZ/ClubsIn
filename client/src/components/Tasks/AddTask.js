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
import RingLoader from 'react-spinners/RingLoader';
import 'react-datepicker/dist/react-datepicker.css';
import SelectMemberOption from './SelectMemberOption';


class AddTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: moment(),
            name: '',
            description: '',
            selectedMembersToAdd: [],
            memberToAdd: '',
            clubMembers: [],
            assignee: [],
            message: '',
            loading: false,
        };

        this.addTask = this.addTask.bind(this);
        this.addToTask = this.addToTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    componentDidMount() {
        this.getClubMembers();
    }

    getClubMembers() {
        const self = this;
        const { match } = this.props; // eslint-disable-line
        fetch(`/api/club/${match.params.clubId}/users`, {
            method: 'GET',
            mode: 'cors',
        }).then((response) => {
            if (response.status === 400) {
                response.json().then((data) => {
                    self.setState({ message: data.error, loading: false });
                });
            } else {
                response.json().then((users) => {
                    self.setState({ clubMembers: users });
                });
            }
        });
    }

    addToTask() {
        const {
            clubMembers,
            memberToAdd,
        } = this.state;

        const newClubMembers = clubMembers.filter(cm => cm._id !== memberToAdd);

        this.setState(prevState => ({
            assignee: [...prevState.assignee, memberToAdd],
            clubMembers: newClubMembers,
            memberToAdd: '',
        }));
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
        self.setState({ loading: true });
        fetch('/api/task', {
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
                this.props.history.push(`/club/${match.params.clubId}/event/${match.params.eventId}`); // eslint-disable-line
            }
        });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleDateChange(date) {
        this.setState({ date });
    }

    handleSelectChange(e) {
        const members = [...e.target.options].filter(o => o.selected).map(o => o);
        this.setState({ [e.target.name]: members[0].value });
    }

    render() {
        const {
            name,
            date,
            description,
            message,
            assignee,
            clubMembers,
            selectedMembersToAdd,
            loading,
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
                    <FormControl
                        name="memberToAdd"
                        componentClass="select"
                        value={selectedMembersToAdd}
                        onChange={this.handleSelectChange}
                        multiple
                    >
                        {clubMembers.map(member => (
                            <SelectMemberOption
                                key={member._id}
                                memberId={member._id}
                                firstName={member.firstName}
                                lastName={member.lastName}
                            />
                        ))}
                    </FormControl>
                    <br/>
                    <Button type="button" bsStyle="primary" onClick={this.addToTask}>Add to task</Button>
                </FormGroup>
                <p>Assigned Users: </p>
                {assignee.map(assigned => <p key={assigned}>{assigned}</p>)}
                
                <Link to={{ pathname: `/club/${match.params.clubId}/event/${match.params.eventId}` }}>
                    <Button type="button">Cancel</Button>
                </Link>
                <Button type="button" onClick={this.addTask}>Add task</Button>
                <RingLoader loading={loading} color="#0B58B6" sizeUnit="px" size="60" inline />
            </div>
        );
    }
}

export default AddTask;
