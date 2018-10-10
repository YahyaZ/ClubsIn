import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddEvent from '../../components/Events/AddEvent';
import Task from '../../components/Tasks';
import TaskDetails from '../../components/Tasks/TaskDetails';
import MenuItem from './MenuItem';
import './EventTasks.css';
import Skeleton from 'react-loading-skeleton';

class EventTasks extends Component {
    constructor() {
        super();
        this.state = {
            event: null,
            selectedMenu: 'myTasks',
            selectedTasks: [1,2,3],
            tasks: [1,2,3],
            selectedTask: null,
            userId: JSON.parse(localStorage.getItem('User'))._id,
            loaded: false
        };
    }

    componentDidMount() {
        this.getEvent();
        this.getTasks();
    }

    getEvent = () => {
        const self = this;
        const { match } = this.props; // eslint-disable-line
        fetch(`/api/event/${match.params.eventId}`, {
            method: 'GET',
            mode: 'cors',
        })
            .then(response => response.json())
            .then(event => self.setState({ event }));
    }

    getMyTasks = () => {
        const { tasks, userId } = this.state;
        const myTasks = tasks.reduce((result, task) => {
            task.assignee.forEach((assignee) => {
                if (assignee._id === userId) {
                    result.push(task);
                }
            });
            return result;
        }, []);

        this.setState({ selectedTasks: myTasks });
    }

    getAllTasks = () => {
        const { tasks } = this.state;
        this.setState({ selectedTasks: tasks });
    }

    getTasks = () => {
        const self = this;
        const { match } = this.props; // eslint-disable-line
        const { selectedMenu, selectedTask } = this.state;
        fetch(`/api/task/event/${match.params.eventId}`, {
            method: 'GET',
            mode: 'cors',
        }).then((response) => {
            if (response.status === 401) {
                return [];
            }
            return response.json();
        }).then((allTasks) => {
            self.setState({
                tasks: allTasks,
                loaded:true
            });

            if (selectedMenu === 'myTasks') {
                self.getMyTasks();
            } else {
                self.getAllTasks();
            }

            if (selectedTask) {
                const updatedTask = allTasks.find(task => task._id === selectedTask._id);
                self.setState({ selectedTask: updatedTask });
            }
        });
    }

    handleKeyPress = (event, action, value) => {
        if (event.key === 'Enter') {
            if (action === 'SELECT_MENU') {
                this.selectMenu(value);
            } else if (action === 'SELECT_TASK') {
                this.selectTask(value);
            }
        }
    }

    isSelectedMenu = (item) => {
        const { selectedMenu } = this.state;
        return selectedMenu === item ? 'active' : '';
    }

    isSelectedTask = (task) => {
        const { selectedTask } = this.state;
        return selectedTask === task ? 'active' : '';
    }

    selectMenu = (item) => {
        const { selectedMenu } = this.state;
        if (item !== selectedMenu) {
            this.setState({
                selectedMenu: item,
                selectedTask: null,
            });

            if (item === 'myTasks') {
                this.getMyTasks();
            } else if (item === 'allTasks') {
                this.getAllTasks();
            }
        }
    }

    selectTask = (task) => {
        const { selectedTask } = this.state;
        if (task !== selectedTask) {
            this.setState({ selectedTask: task });
        }
    }

    renderTaskList() {
        const { selectedTasks } = this.state;
        selectedTasks.sort(task => task.completed ? 1 : -1);
        return (
            <div className="event-task-list" key="task-list">
                {selectedTasks
                    ? selectedTasks.map(task => (
                        <Task
                            name={task.name}
                            date={task.due_date}
                            active={this.isSelectedTask(task)}
                            members={task.assignee}
                            completed={task.completed}
                            key={task._id}
                            onClick={() => this.selectTask(task)}
                            onKeyPress={e => this.handleKeyPress(e, 'SELECT_TASK', task)}
                        />
                    ))
                    : ''}
            </div>
        );
    }

    renderTaskDetails() {
        const { selectedTask } = this.state;
        const { match } = this.props;
        return (
            <div className="event-task-details" key="task-details">
                {selectedTask
                    ? (
                        <TaskDetails
                            taskId={selectedTask._id}
                            name={selectedTask.name}
                            date={selectedTask.due_date}
                            description={selectedTask.description}
                            members={selectedTask.assignee}
                            completed={selectedTask.completed}
                            getTasks={this.getTasks}
                            editLink={`/club/${match.params.clubId}/event/${match.params.eventId}/task/${selectedTask._id}`}
                        />
                    )
                    : ''
                }
            </div>
        );
    }

    render() {
        const { event, selectedMenu, loaded } = this.state;
        const { match } = this.props; // eslint-disable-line
        return (
            <div>
                <h2 className="event-title">{loaded ? (event && `${event.name} - ${new Date(event.date).toDateString()}`):<Skeleton width={500} />}</h2>
                <div className="event-tasks-container">
                    <div className="event-menu">
                        <div>
                            <MenuItem
                                itemName="My Tasks"
                                itemType="myTasks"
                                isSelectedMenu={this.isSelectedMenu}
                                selectMenu={this.selectMenu}
                                handleKeyPress={this.handleKeyPress}
                            />
                            <MenuItem
                                itemName="All Tasks"
                                itemType="allTasks"
                                isSelectedMenu={this.isSelectedMenu}
                                selectMenu={this.selectMenu}
                                handleKeyPress={this.handleKeyPress}
                            />
                            <MenuItem
                                itemName="Event Details"
                                itemType="eventDetails"
                                isSelectedMenu={this.isSelectedMenu}
                                selectMenu={this.selectMenu}
                                handleKeyPress={this.handleKeyPress}
                            />
                        </div>
                        <div className="event-menu-button">
                            <Link to={`/club/${match.params.clubId}`}>
                                <Button>Return to club</Button>
                            </Link>
                        </div>
                    </div>
                    {selectedMenu === 'eventDetails'
                        ? (
                            <AddEvent
                                _id={event._id}
                                match={match}
                                name={event.name}
                                date={event.date}
                                description={event.description}
                                getEvent={this.getEvent}
                                edit
                            />
                        )
                        : (
                            [
                                this.renderTaskList(),
                                this.renderTaskDetails(),
                            ]
                        )}
                </div>
            </div>
        );
    }
}

export default EventTasks;
