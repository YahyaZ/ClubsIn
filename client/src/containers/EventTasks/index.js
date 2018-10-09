import React, { Component } from 'react';
import Task from '../../components/Tasks';
import TaskDetails from '../../components/Tasks/TaskDetails';
import MenuItem from './MenuItem';
import './EventTasks.css';

class EventTasks extends Component {
    constructor() {
        super();
        this.state = {
            selectedMenu: 'myTasks',
            selectedTasks: [],
            tasks: [],
            selectedTask: null,
            userId: JSON.parse(localStorage.getItem('User'))._id,
        };
    }

    componentDidMount() {
        this.getTasks();
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

    getTasks = async () => {
        const self = this;
        const { match } = this.props; // eslint-disable-line
        fetch(`/api/task/${match.params.eventId}`, {
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
            });
            this.getMyTasks();
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

    render() {
        const { selectedTasks, selectedTask } = this.state;
        return (
            <div className="event-tasks-container">
                <div className="event-menu">
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
                </div>
                <div className="event-task-list">
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
                <div className="event-task-details">
                    {selectedTask
                        ? (
                            <TaskDetails
                                taskId={selectedTask._id}
                                name={selectedTask.name}
                                date={selectedTask.due_date}
                                description={selectedTask.description}
                                members={selectedTask.assignee}
                                completed={selectedTask.completed}
                            />
                        )
                        : ''
                    }
                </div>
            </div>
        );
    }
}

export default EventTasks;
