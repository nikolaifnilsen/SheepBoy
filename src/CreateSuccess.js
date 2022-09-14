import React, { Component } from 'react';

export default class CreateSuccess extends Component {
    render() {
        return (
            <section className="not-found-page">
                <p className="not-found-text">Your page has been created!</p>
                <div className="not-found-button" role="button" onClick={() => {
                    this.props.readCallback();
                }}>View Page</div>
                <div className="not-found-button" role="button" onClick={() => {
                    this.props.searchCallback();
                    this.props.resetCallback();
                }}>Return To Home</div>
            </section>
        );
    }
}