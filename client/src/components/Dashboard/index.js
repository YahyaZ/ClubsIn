
import React, { Component } from 'react';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            selectedMenu: 'myTasks',
            tasks: [],
            selectedTask: null,
        };
    }
    
    render(){
        return(
    <div>
        You are logged in!
    </div>)
    }
};

export default Dashboard;
