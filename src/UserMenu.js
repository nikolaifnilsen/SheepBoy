import React, { Component } from 'react';
import 'firebase/auth';

export default class UserMenu extends Component {
    render() {

        let hide = "";
        if (this.props.isHidden) {
            hide = " hidden";
        }

        let username = "";
        if (this.props.user) {
            username = this.props.user.displayName;
        }

        return (
            <div className={"user-menu" + hide} onMouseLeave={() => {this.props.hideCallback()}}> 
                <div className="user-name">
                    <p>{username}</p>
                </div>
                <div className="user-options-container">
                    <div className="user-option option-sign-out" role="button"
                    onClick={() => {
                        this.props.signOutCallback();
                        this.props.hideCallback();
                        this.props.searchCallback();
                    }}>
                        <p>Sign Out</p>
                    </div>
                    <div className="user-option option-create-page" role="button"
                    onClick={() => {
                        this.props.createCallback();
                        this.props.hideCallback();
                    }}>
                        <p>Create Page</p>
                    </div>
                </div>
            </div>
        );
    }
}