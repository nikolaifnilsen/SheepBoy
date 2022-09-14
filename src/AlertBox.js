import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

// Creates an alert box component if page loading experienced an error
class AlertBox extends Component {    
    render() {
        let hide = "";
        if (this.props.errorText === null) {
            hide = " hidden";
        }

        return (
            <div className={"error-alert" + hide} role="alert" aria-label="error alert">
                <p>{this.props.errorText}</p>
                <FontAwesomeIcon icon={faTimesCircle} className="fa fa-times-circle" 
                onClick={() => {this.props.hideCallback()}} />     
            </div>
        );
    }
}

export default AlertBox;