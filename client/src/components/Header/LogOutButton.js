import React from 'react';
import { Button } from 'react-bootstrap';

const LogOutButton = (props) => (
    <div>
        <Button bsStyle="primary"
                onClick={function(){
                    fetch('/api/user/logout',{
                        mode: 'cors',
                    })
                    .then(function(response){
                        if(response.status == 204){
                            props.props.authenticate(false);
                        }
                    });
                }}>Log Out</Button>
    </div>
);

export default LogOutButton;
