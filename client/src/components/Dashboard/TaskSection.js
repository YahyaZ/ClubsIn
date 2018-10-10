import React, { Component } from 'react';
import Event from '../../components/Events';

class TaskSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [1, 2, 3],
            loaded: false,
        };
    }

    componentDidMount() {
        this.getTasks();
    }

    getTasks() {
        const self = this;
        fetch('/api/task/assigned', {
            method: 'GET',
            mode: 'cors',
        }).then((response) => {
            if (response.status === 401) {
                return [];
            }
            return response.json();
        }).then((tasks) => {
            self.setState({ tasks, loaded: true });
        });
    }

    renderNoTasks = () => (
        <div>
            You don&apos;t have any tasks assigned!
        </div>
    )

    renderTasks() {
        const { tasks, loaded } = this.state;
        return (
            <div>
                See your assigned tasks!
                <div className="club-container">
                    {loaded ? tasks.map(task => (
                        <Event
                            name={task.name}
                            date={task.due_date}
                            members={task.assignee}
                            link={`/club/${task.event_id.club_id}/event/${task.event_id._id}?taskId=${task._id}`}
                        />
                    )) : tasks.map(i => <Event key={i} />)
                    }
                </div>
            </div>
        );
    }

    render() {
        const { tasks } = this.state;
        return (
            <div>
                { tasks.length !== 0 ? this.renderTasks() : this.renderNoTasks() }
            </div>
        );
    }
}

export default TaskSection;
