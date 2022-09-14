import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export default class CreateRelease extends Component {
    handleLinkChange = (event) => {
        let dateText = event.target.value;

        this.props.changeCallback(this.props.index, this.props.obj.client, dateText);
    }

    handleAltChange = (event) => {
        let clientText = event.target.value;

        this.props.changeCallback(this.props.index, clientText, this.props.obj.date);
    }

    render() {
        return(
            <tbody className="table-removable">
                <tr className="remove-element" onClick={() => this.props.removeCallback(this.props.index)}>
                    <td><FontAwesomeIcon className="fa fa-times-circle" icon={faTimesCircle}/></td>
                </tr>
                <tr>
                    <th>{this.props.altTitle}</th>
                    <td><input className="attribute-input" type="text" value={this.props.obj.client} 
                    onChange={this.handleAltChange}/></td>
                </tr>
                <tr>
                    <th>{this.props.linkTitle}</th>
                    <td><input className="attribute-input" type="text" value={this.props.obj.date}
                    onChange={this.handleLinkChange}/></td>
                </tr>
            </tbody>
        );
    }
}