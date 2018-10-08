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
import './AddTask.css';


class AddTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: moment(),
            name: '',
            description: '',
            selectedMembers: [],
            selectedAssigned: [],
            clubMembers: [],
            assignee: [],
            message: '',
            loading: false,
        };

        this.addTask = this.addTask.bind(this);
        this.handleMemberSelectClick = this.handleMemberSelectClick.bind(this);
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

    handleMemberSelectClick(action) {
        const {
            clubMembers,
            selectedMembers,
            assignee,
            selectedAssigned,
        } = this.state;

        let memberList = clubMembers;
        let memberListKey = 'clubMembers';
        let moveToList = assignee;
        let moveToListKey = 'assignee';
        let selectedList = selectedMembers;
        let selectedListKey = 'selectedMembers';

        // switch arrays depending on button action
        if (action === 'REMOVE') {
            memberList = assignee;
            memberListKey = 'assignee';
            moveToList = clubMembers;
            moveToListKey = 'clubMembers';
            selectedList = selectedAssigned;
            selectedListKey = 'selectedAssigned';
        }

        const newMemberList = memberList
            .filter(clubMember => selectedList
                .every(selected => selected._id !== clubMember._id));

        this.setState({
            [moveToListKey]: moveToList.concat(selectedList),
            [memberListKey]: newMemberList,
            [selectedListKey]: [],
        });
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
            if (response.status !== 200) {
                response.json().then((data) => {
                    self.setState({ message: data.error, loading: false });
                });
            } else {
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
        const { clubMembers, assignee } = this.state;
        let membersList = clubMembers;
        // switch depending on which select was changed
        if (e.target.name === 'selectedAssigned') {
            membersList = assignee;
        }
        const members = [...e.target.options]
            .filter(option => option.selected)
            .map(option => membersList[option.value]);
        this.setState({ [e.target.name]: members });
    }

    render() {
        const {
            name,
            date,
            description,
            message,
            assignee,
            clubMembers,
            loading,
            selectedMembers,
            selectedAssigned,
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
                <FormGroup className="task-select" controlId="formAssign">
                    <FormGroup className="member-select">
                        <ControlLabel>Members: </ControlLabel>
                        <FormControl
                            name="selectedMembers"
                            componentClass="select"
                            onChange={this.handleSelectChange}
                            multiple
                        >
                            {clubMembers.map((member, index) => (
                                <SelectMemberOption
                                    key={member._id}
                                    index={index}
                                    firstName={member.firstName}
                                    lastName={member.lastName}
                                />
                            ))}
                        </FormControl>
                    </FormGroup>
                    <FormGroup className="button-select">
                        <Button type="button" onClick={() => this.handleMemberSelectClick('ADD')} disabled={selectedMembers.length === 0}>&gt;&gt;</Button>
                        <Button type="button" onClick={() => this.handleMemberSelectClick('REMOVE')} disabled={selectedAssigned.length === 0}>&lt;&lt;</Button>
                    </FormGroup>
                    <FormGroup className="member-select">
                        <ControlLabel>Assigned: </ControlLabel>
                        <FormControl
                            name="selectedAssigned"
                            componentClass="select"
                            onChange={this.handleSelectChange}
                            multiple
                        >
                            {assignee.map((member, index) => (
                                <SelectMemberOption
                                    key={member._id}
                                    index={index}
                                    firstName={member.firstName}
                                    lastName={member.lastName}
                                />
                            ))}
                        </FormControl>
                    </FormGroup>
                </FormGroup>

                <Link to={{ pathname: `/club/${match.params.clubId}/event/${match.params.eventId}` }}>
                    <Button type="button">Cancel</Button>
                </Link>
                <Button type="button" onClick={this.addTask}>Add task</Button>
                <RingLoader loading={loading} color="#0B58B6" sizeUnit="px" size={60} inline />
            </div>
        );
    }
}

export default AddTask;
