import React, { Component } from 'react';

class UserManagement extends Component {
 
    render(){
        return(
            <div>
                Hello {this.props.user.firstName}
            </div>
        )
    }
};

export default UserManagement;
