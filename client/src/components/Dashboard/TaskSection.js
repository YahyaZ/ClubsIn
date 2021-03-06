import React, { Component } from 'react';
import Event from '../Events';
/* Shows tasks that the current user is working on */
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
            if (response.status !== 200) {
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
                            key={loaded ? task._id : task}
                            name={task.name}
                            date={task.due_date}
                            link={`/club/${task.event_id.club_id}/event/${task.event_id._id}?taskId=${task._id}`}
                        />
                    )) : tasks.map(i => <Event key={i} />)
                    }
                </div>
            </div>
        );
    }

    render() {
        const { tasks, loaded } = this.state;
        let tasksToRender = this.renderTasks();
        if (loaded && tasks.length === 0) tasksToRender = this.renderNoTasks();
        return (
            <div>
                {tasksToRender}
            </div>
        );
    }
}

export default TaskSection;
