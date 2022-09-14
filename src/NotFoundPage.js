import React, { Component } from 'react';
import {BLANK_PAGE} from './ObjectTemplates';

export default class NotFoundPage extends Component {
    render() {
        return(
            <section className="not-found-page">
                <p className="not-found-text">It looks like this page doesn't exist yet! Be the first to create it!</p>
                <div className="not-found-button" role="button" onClick={() => {
                    if (this.props.user) {
                        this.props.editCallback();
                        this.props.pageCallback(BLANK_PAGE);
                        this.props.recentCallback(BLANK_PAGE.history[0]);
                    } else {
                        this.props.errorCallback("You must be logged in before you can create a page!");
                    }
                }}>Create Page</div>
                <div className="not-found-button" role="button" onClick={() => {
                    this.props.searchCallback();
                    this.props.resetCallback();
                }}>Return To Home</div>
            </section>
        );
    }
}