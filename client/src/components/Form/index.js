import React, { Component } from "react";
import Logo from '../LOGO/logo.png'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"

const Header = (props) => (   
        <div className="form-header">
            <img className="logo" src = {Logo} alt="logo" />
            <div className="tagline">{props.tagline}</div>
        </div>
    );

const Footer = (props) => (
        <div className="form-footer">{props.text} <a href={props.link} className="link">{props.linkText}</a></div>
     )

class FormBody extends Component{
        constructor(props){
            super(props);
            this.state = {
                type: 'password'
            }
            this.showHidePassword = this.showHidePassword.bind(this);
        }


        showHidePassword (e) {
            e.preventDefault();
            e.stopPropagation();
            this.setState({
                type: this.state.type === 'input' ? 'password' : 'input'
            }) 
        }
        
        render(){
            return (
                <form className="form-body">
                    <div className="input-container">
                        <FaEnvelope className="icon"/>
                        <input className="input-field" type="text" placeholder="email" name="email" />
                    </div>
                    <div className="input-container">
                        <FaLock className="icon"/>
                        <input className="input-field" type={this.state.type} placeholder="password" name="password" />
                        <div className="icon show-password" onMouseDown={this.showHidePassword} onMouseUp={this.showHidePassword}>
                            {this.state.type === 'input' ? <FaEye /> : <FaEyeSlash />}
                        </div>
                    </div>
                    <div className="form-body-footer" >
                        <div className="form-checkbox">
                            <input type="checkbox" name="RememberMe" />
                            <label>Remember Me</label>
                        </div>
                        <div className="form-bottom-left link">
                            Forgot Password?
                        </div>
                    </div>
                    <button className="form-button">Log In</button>
                </form>
            )
    }
}




class Form extends Component {
    render() {
        return(
            <div>
                <Header tagline="Log in to manage your Club"/>
                <FormBody /> 
                <Footer text="Already have an account?" linkText ="Sign in here"/> 
            </div>
        )
    }
}

export default Form;