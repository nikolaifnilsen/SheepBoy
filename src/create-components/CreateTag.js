import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export default class CreateTag extends Component {
    handleChange = (event) => {
        let tagText = event.target.value;

        this.props.changeCallback(this.props.index, tagText);
    }

    render() {
        return(
            <tbody className="table-removable">
                <tr className="remove-element" onClick={() => {this.props.removeCallback(this.props.index)}}>
                    <td><FontAwesomeIcon className="fa fa-times-circle" icon={faTimesCircle}/></td>
                </tr>
                <tr>
                    <th>Tags:</th>
                    <td><input className="attribute-input" type="text" value={this.props.tagText} 
                    onChange={this.handleChange}/></td>
                </tr>
            </tbody>
        );
    }
}