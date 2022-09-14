import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

// Creates a banner navigation component and renders our project's title and icon, as well as navigation menu and account login icons
class BannerNav extends Component {

    render() {
        let userButton;
        let userName;
        if (this.props.user) {
            userName = this.props.user.displayName;
            userButton = (
                <div className="icon-container" onClick={() => {this.props.showUserCallback()}}>
                    <FontAwesomeIcon className="fa fa-user-o" icon={faUser} aria-hidden="true"/>
                </div>
            );
        } else {
            userName = 'Log-in';
            userButton = (
                <div className="icon-container" onClick={() => {this.props.showAuthCallback()}}>
                    <FontAwesomeIcon className="fa fa-user-o" icon={faUser} aria-hidden="true"/>
                </div>
            );
        }

        return (
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="site-title-container">
                        <img className="site-icon" src={require("./img/site/original/sheepboy.png")} alt="sheepboy-icon"/>
                        <h1>SheepBoy</h1>
                    </div>
                    <div className="user-container" role="button">
                        <p className="user-name">{userName}</p>
                        {userButton}
                    </div>
                </div>
            </nav>
        );
    }
}

export default BannerNav;