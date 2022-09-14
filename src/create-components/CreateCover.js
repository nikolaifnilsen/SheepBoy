import React, { Component } from 'react';

export default class CreateCover extends Component {

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

    render () {
        return (
            <table className="attribute-container">
                <tbody className="attribute-table">
                    <tr>
                        <th>Cover Art Link:</th>
                        <td><input className="attribute-input" type="text" value={this.props.link} onChange={this.handleLinkChange}></input></td>
                    </tr>
                    <tr>
                        <th>Cover Art Alt Text:</th>
                        <td><input className="attribute-input" type="text" value={this.props.alt} onChange={this.handleAltChange}></input></td>
                    </tr>
                </tbody>
            </table>
        );
    }
}