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
            tasks: [],
            selectedTask: null,
        };
    }

    componentDidMount() {
        const tasks = this.getMyTasks();
        this.setState({ tasks });
    }

    getMyTasks = () => {
        const tasks = [];
        return tasks;
    }

    getAllTasks = () => {
        const tasks = [];
        return tasks;
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
                const tasks = this.getMyTasks();
                this.setState({ tasks });
            } else if (item === 'allTasks') {
                const tasks = this.getAllTasks();
                this.setState({ tasks });
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
        const { tasks, selectedTask } = this.state;
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
                    {tasks
                        ? tasks.map(task => (
                            <Task
                                name={task.name}
                                date={task.date}
                                active={this.isSelectedTask(task)}
                                member={task.member}
                                key={task.name}
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
                                name={selectedTask.name}
                                date={selectedTask.date}
                                description={selectedTask.description}
                                member={selectedTask.member}
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
