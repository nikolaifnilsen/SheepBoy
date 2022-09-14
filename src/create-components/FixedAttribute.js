import React, { Component } from 'react';

export default class FixedAttribute extends Component {
    // Updates page's cover link when input changes.
    handleLinkChange = (event) => {
        let linkText = event.target.value;

        this.props.linkCallback(linkText);
    }

    // Update pages' cover alt text when input changes.
    handleAltChange = (event) => {
        let altText = event.target.value;

        this.props.altCallback(altText);
    }

    render() {
        return(
            <tbody className="attribute-table">
                <tr>
                    <th>{this.props.altTitle}</th>
                    <td>
                        <input className="attribute-input" type="text" value={this.props.alt}
                        onChange={this.handleAltChange}/>
                    </td>
                </tr>
                <tr>
                    <th>{this.props.linkTitle}</th>
                    <td>
                        <input className="attribute-input" type="text" value={this.props.link}
                        onChange={this.handleLinkChange}/>
                    </td>
                </tr>
            </tbody>
        );
    }
}