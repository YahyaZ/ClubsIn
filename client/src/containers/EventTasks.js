import React, { Component } from 'react';
import Task from '../components/Tasks/Task';
import TaskDetails from '../components/Tasks/TaskDetails';
import './EventTasks.css';

class EventTasks extends Component {
    getTasks() {
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

    render() {
        var allTasks = this.getTasks();
        return (
            <div className="event-tasks-container">
                <div className="event-menu">
                    <div>
                        <h2>My Tasks</h2>
                    </div>
                    <div className="active">
                        <h2>All Tasks</h2>
                    </div>
                </div>
                <div className="event-task-list">
                    {allTasks.map((task, i) =>
                        <Task name={task.name} date={task.date} member={task.member} key={i}/>
                    )}
                </div>
                <div className="event-task-details">
                    <TaskDetails name={allTasks[1].name} date={allTasks[1].date} 
                        description={allTasks[1].description} member={allTasks[1].member}/>
                </div>
            </div>
        )
    }
}

export default EventTasks;