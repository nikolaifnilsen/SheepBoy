import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export default class CreateSummary extends Component {
    handleChange = (event) => {
        let summaryText = event.target.value;

        this.props.changeCallback(this.props.index, summaryText);
    }

    render() {
        return(
            <div className="edit-summary-text">
                <textarea rows="20" cols="55" value={this.props.summaryText}
                onChange={this.handleChange}/>
                <button className="content-button" onClick={() => {this.props.removeCallback(this.props.index)}}>
                    <FontAwesomeIcon className="fa fa-times-circle" icon={faTimesCircle}/>
                </button>
            </div>
        );
    }
}