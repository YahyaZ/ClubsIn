import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Logo from '../LOGO/logo.png'


const Header = (props) => (   
        <div className="form-header">
            <img className="logo" src = {Logo} alt="logo" />
            <div className="tagline">{props.tagline}</div>
        </div>
    );

const Footer = (props) => (
        <div className="form-footer">{props.text} <span className="link">{!props.linkClick ?    <Link to={`${props.link}`}> {props.linkText} </Link> :
                                                                                                <span onClick={props.linkClick}>{props.linkText}</span>}
                                                  </span>
                        
        </div>
     )


class Form extends Component {
    render() {
        return(
            <div>
                <Header tagline={this.props.tagline}/>
                {this.props.formBody}
                <Footer text={this.props.footerText} 
                        linkText ={this.props.footerLinkText} 
                        link={this.props.footerLink}
                        linkClick={this.props.footerLinkClick}/> 
            </div>
        )
    }
}

export default Form;