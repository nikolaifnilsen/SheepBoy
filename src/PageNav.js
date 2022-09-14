import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

// Creates a page navigation component that renders a game's information and editorial page
class PageNav extends Component {

    render() {
        let hide = "";
        if (this.props.hide) {
            hide = " hidden";
        }

        let readHighlight = "";
        if (this.props.showRead) {
            readHighlight = " gray-background";
        }

        let editHighlight = "";
        let createButton;
        if (this.props.showEdit) {
            editHighlight = " gray-background";

            createButton = (
                <div className="page-button create-button" role="button" 
                aria-label="create button" tabIndex="0" onClick={() => {
                    this.props.updateCallback();
                    this.props.createdCallback();
                }}>
                    <p>Create Page</p>
                </div>
            );
        } else {
            createButton = (<div className="page-button placeholder-button"></div>);
        }

        return (
            <nav className={"page-nav" + hide}>
                <div className="page-button back-button" role="button" aria-label="back button" tabIndex="0"
                onClick={() => {
                    this.props.searchCallback();
                    this.props.resetCallback();
                }}>
                    <div className="back-icon-container">
                        <FontAwesomeIcon className={"fa fa-chevron-left"} icon={faChevronLeft}/>
                    </div>
                </div>
                <div className={"page-button read-button" + readHighlight} role="button" 
                aria-label="read button" tabIndex="0" onClick={() => {this.props.readCallback()}}><p>Read</p></div>
                <div className={"page-button edit-button" + editHighlight} role="button" 
                aria-label="edit button" tabIndex="0" onClick={() => {
                    if (this.props.user) {
                        this.props.editCallback();
                    } else {
                        this.props.errorCallback("You must be logged in before you can edit a page!");
                    }
                    
                }}><p>Edit</p></div>
                {createButton}
             </nav>
        );
    }
}

export default PageNav;