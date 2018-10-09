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
            edit: false,
            taskId: '',
        };

        this.addTask = this.addTask.bind(this);
        this.handleMemberSelectClick = this.handleMemberSelectClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    componentDidMount() {
        const { match } = this.props; // eslint-disable-line
        if (match.params.taskId) {
            this.getTaskDetails(match.params.clubId, match.params.taskId);
        } else {
            this.getClubMembers();
        }
    }

    getTaskDetails = async (clubId, taskId) => {
        const taskResponse = await fetch(`/api/task/${taskId}`);
        const task = await taskResponse.json();
        const membersResponse = await fetch(`/api/club/${clubId}/users`);
        const members = await membersResponse.json();
        if (task) {
            const unassignedMembers = this.filterMembers(members, task.assignee);
            this.setState({
                date: moment(task.due_date),
                name: task.name,
                description: task.description,
                clubMembers: unassignedMembers,
                assignee: task.assignee,
                edit: true,
                taskId: task._id,
            });
        }
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

    filterMembers = (sourceList, targetList) => (
        sourceList.filter(sourceMember => targetList
            .every(targetMember => sourceMember._id !== targetMember._id))
    )

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

        const newMemberList = this.filterMembers(memberList, selectedList);

        this.setState({
            [moveToListKey]: moveToList.concat(selectedList),
            [memberListKey]: newMemberList,
            [selectedListKey]: [],
        });
    }

    addTask(method) {
        const self = this;
        const { match } = this.props; // eslint-disable-line
        const {
            taskId,
            date,
            name,
            description,
            assignee,
        } = this.state;
        const userId = JSON.parse(localStorage.getItem('User'))._id;

        const fields = {
            _id: taskId,
            event_id: match.params.eventId,
            created_by: userId,
            due_date: moment(date).toISOString(),
            name,
            completed: false,
            description,
            assignee,
        };
        self.setState({ loading: true });
        fetch('/api/task', {
            method,
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fields),
        }).then((response) => {
            if (response.status !== 200) {
                response.json().then((data) => {
                    self.setState({ message: data.error, loading: false });
                });
            } else {
                self.props.history.push(`/club/${match.params.clubId}/event/${match.params.eventId}`);
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
            edit,
        } = this.state;

        const { match } = this.props; // eslint-disable-line
        const method = edit ? 'PUT' : 'POST'; // if editing, PUT request, else POST
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
                <Button type="button" onClick={() => this.addTask(method)}>{edit ? 'Edit task' : 'Add task'}</Button>
                <RingLoader loading={loading} color="#0B58B6" sizeUnit="px" size={60} inline />
            </div>
        );
    }
}

export default AddTask;
