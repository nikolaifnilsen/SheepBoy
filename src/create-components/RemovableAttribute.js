import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export default class RemovableAttribute extends Component {
    handleLinkChange = (event) => {
        let linkText = event.target.value;

        this.props.changeCallback(this.props.index, linkText, this.props.obj.alt);
    }

    handleAltChange = (event) => {
        let altText = event.target.value;

        this.props.changeCallback(this.props.index, this.props.obj.link, altText);
    }

    render() {
        return(
            <tbody className="table-removable">
                <tr className="remove-element" onClick={() => this.props.removeCallback(this.props.index)}>
                    <td><FontAwesomeIcon className="fa fa-times-circle" icon={faTimesCircle}/></td>
                </tr>
                <tr>
                    <th>{this.props.altTitle}</th>
                    <td><input className="attribute-input" type="text" value={this.props.obj.alt} 
                    onChange={this.handleAltChange}/></td>
                </tr>
                <tr>
                    <th>{this.props.linkTitle}</th>
                    <td><input className="attribute-input" type="text" value={this.props.obj.link}
                    onChange={this.handleLinkChange}/></td>
                </tr>
            </tbody>
        );
    }
}