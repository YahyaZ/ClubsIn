import React, { Component } from 'react';
import {Jumbotron, Button} from 'react-bootstrap';



const Welcome = () => (
    <div className="jumbotron jumbotron-fluid" style={{textAlign: 'center', backgroundColor:'transparent'}}>
        <h1>Club'in</h1>
        <p>
            Makes your university club management easy and efficient, so you can spend more time having fun!
        </p>
        <Button>Sign Up</Button>
        <Button>Login</Button>
    </div>
);

export default Welcome;
