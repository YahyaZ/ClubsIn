import React, { Component } from 'react';
import Task from '../../components/Tasks';
import TaskDetails from '../../components/Tasks/TaskDetails';
import './EventTasks.css';

class EventTasks extends Component {
    constructor() {
        super();
        this.state = {
            selectedMenu: 'myTasks',
            tasks: [],
            selectedTask: null
        }
    }

    componentDidMount() {
        const tasks = this.getMyTasks();
        this.setState({
            tasks: tasks
        })
    }

    getMyTasks() {
        return [
            {
                name: "Get refreshments",
                date: "28th August",
                description: "Get refreshments from woolies or something",
                member: {
                    name: "Yahya",
                    color: "#FF7816"
                }
            },
            {
                name: "Get food",
                date: "28th August",
                description: "Secure food supplies from woolies or coles, SOMETHING",
                member: {
                    name: "Yahya",
                    color: "#FF7816"
                }
            }
        ]
    }
    
    getAllTasks() {
        return [
            {
                name: "Get refreshments",
                date: "28th August",
                description: "Get refreshments from woolies or something",
                member: {
                    name: "Yahya",
                    color: "#FF7816"
                }
            },
            {
                name: "Contact sponsor",
                date: "27th August",
                description: "Contact sponsor to confirm placement. Sponsor contact: 123456789",
                member: {
                    name: "Malek",
                    color: "#28DAA5"
                }
            },
            {
                name: "Get food",
                date: "28th August",
                description: "Secure food supplies from woolies or coles, SOMETHING",
                member: {
                    name: "Yahya",
                    color: "#FF7816"
                }
            }
        ];
    }

    selectMenu(item) {
        if (item != this.state.selectedMenu) {
            this.setState({
                selectedMenu: item,
                selectedTask: null
            });
    
            if (item === 'myTasks') {
                const tasks = this.getMyTasks();
                this.setState({
                    tasks: tasks
                });
            } else if (item === 'allTasks') {
                const tasks = this.getAllTasks();
                this.setState({
                    tasks: tasks
                });
            }
        }
    }

    selectTask(task) {
        if (task != this.state.selectedTask) {
            this.setState({
                selectedTask: task
            });
        }
    }

    isSelectedMenu(item) {
        return this.state.selectedMenu === item ? 'active' : '';
    }

    isSelectedTask(task) {
        return this.state.selectedTask === task ? 'active' : '';
    }

    render() {
        return (
            <div className="event-tasks-container">
                <div className="event-menu">
                    <div className={'event-menu-item ' + this.isSelectedMenu('myTasks')} onClick={() => this.selectMenu('myTasks')}>
                        <h2>My Tasks</h2>
                    </div>
                    <div className={'event-menu-item ' + this.isSelectedMenu('allTasks')} onClick={() => this.selectMenu('allTasks')}>
                        <h2>All Tasks</h2>
                    </div>
                </div>
                <div className="event-task-list">
                    {this.state.tasks ? 
                        this.state.tasks.map((task, i) =>
                            <Task name={task.name} date={task.date} member={task.member} key={i} 
                                onClick={() => this.selectTask(task)} active={this.isSelectedTask(task)}/>
                        )
                        : ''}
                </div>
                <div className="event-task-details">
                    {this.state.selectedTask ? 
                    <TaskDetails name={this.state.selectedTask.name} date={this.state.selectedTask.date} 
                        description={this.state.selectedTask.description} member={this.state.selectedTask.member}/>
                    : ''}
                </div>
            </div>
        )
    }
}

export default EventTasks;