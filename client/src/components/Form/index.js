import React, { Component } from "react";
import Logo from '../LOGO/logo.png'


const Header = (props) => (   
        <div className="form-header">
            <img className="logo" src = {Logo} alt="logo" />
            <div className="tagline">{props.tagline}</div>
        </div>
    );

const Footer = (props) => (
        <div className="form-footer">{props.text} <a    href={props.link} 
                                                        className="link"
                                                        onClick={props.linkClick}>
                                                            {props.linkText}
                                                            </a>
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