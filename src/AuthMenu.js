import React, { Component } from 'react';
import 'firebase/auth';

export default class AuthMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSigningUp: false,
            username: "",
            email: "",
            password: ""
        }
    }

    emptyCredentials = () => {
        this.setState({username: "", email: "", password: ""});
    }

    // Shows sign up menu.
    showSignUp = () => {
        this.setState({isSigningUp: true});
    }

    // Hides sign up menu.
    hideSignUp = () => {
        this.setState({isSigningUp: false});
    }

    handleUsername = (event) => {
        let newValue = event.target.value
        this.setState({username: newValue});
     }

    handleEmail = (event) => {
        let newValue = event.target.value;
        this.setState({email: newValue});
    }

    handlePassword = (event) => {
        let newValue = event.target.value
        this.setState({password: newValue});
     }

    render() {
        let hide = "";
        if (this.props.isHidden) {
            hide = " hidden";
        }

        let highlightSignIn = "";
        if (!this.state.isSigningUp) {
            highlightSignIn = " red";
        }

        let highlightSignUp = "";
        if (this.state.isSigningUp) {
            highlightSignUp = " red";
        }

        let authInputs;
        let submitButton;

        if (this.state.isSigningUp) {
            authInputs = (
                <div className="auth-input-container">
                    <div className="auth-container">
                        <p>Username:</p>
                        <input className="auth-input username-input" type="text" 
                        onChange={this.handleUsername} value={this.state.username}/>
                    </div>
                    <div className="auth-container">
                        <p>Email:</p>
                        <input className="auth-input email-input" type="text" 
                        onChange={this.handleEmail} value={this.state.email}/>
                    </div>
                    <div className="auth-container">
                        <p>Password:</p>
                        <input className="auth-input password-input" type="text" 
                        onChange={this.handlePassword} value={this.state.password}/>
                    </div>
                </div>
            );
            
            submitButton = (
                <div className="auth-submit-button" role="button" 
                onClick={() => {
                    this.props.hideCallback();
                    if (this.state.username.length > 15) {
                        this.props.errorCallback("Usernames cannot be greater than 15 characters in length.")
                    } else {
                        this.props.signUpCallback(this.state.email, this.state.password, this.state.username);
                    }
                    this.emptyCredentials();
                }}>
                    <p>Submit</p>
                </div>
            );
            
        } else {
            authInputs = (
                <div className="auth-input-container">
                    <div className="auth-container">
                        <p>Email:</p>
                        <input className="auth-input email-input" type="text" 
                        onChange={this.handleEmail} value={this.state.email}/>
                    </div>
                    <div className="auth-container">
                        <p>Password:</p>
                        <input className="auth-input password-input" type="text" 
                        onChange={this.handlePassword} value={this.state.password}/>
                    </div>
                </div>
            );

            submitButton = (
                <div className="auth-submit-button" role="button"
                onClick={() => {
                    this.props.hideCallback();
                    this.props.signInCallback(this.state.email, this.state.password);
                    this.emptyCredentials();
                }}> 
                    <p>Submit</p>
                </div>
            );
        }

        return (
            <div className={"auth-menu" + hide} onMouseLeave={() => {this.props.hideCallback()}}>   
                <div className="auth-tab-container">
                    <div className={"auth-tab" + highlightSignIn} onClick={this.hideSignUp}>
                       <p>Sign-In</p>
                    </div>
                    <div className={"auth-tab" + highlightSignUp} onClick={this.showSignUp}>
                        <p>Sign-Up</p>
                    </div>
                </div>
                {authInputs}
                {submitButton}
            </div>
        );

    }
}