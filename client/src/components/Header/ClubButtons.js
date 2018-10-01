import React, {Component, Fragment} from 'react';
import { Button } from 'react-bootstrap';
import './Header.css';
import InviteClub from '../InviteClub';

class ClubButtons extends Component {
        constructor() {  
                super();
                this.handleShow = this.handleShow.bind(this);
                this.handleClose = this.handleClose.bind(this);
            
                this.state = {
                  show: false
                };
              }
            
              handleClose() {
                this.setState({ show: false });
              }
            
              handleShow() {
                this.setState({ show: true });
              }

        render(){
                return(
                <Fragment>
                        <Button bsStyle="primary">Add Event</Button>
                        <Button bsStyle="success" onClick={this.handleShow}>Invite Execs</Button>
                        <InviteClub show={this.state.show} hide={this.handleClose}/>
                </Fragment>   
                )
        }

}

export default ClubButtons;
