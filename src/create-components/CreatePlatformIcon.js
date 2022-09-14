import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import pIcons from './../PlatformIcons';

export default class CreatePlatformIcon extends Component {
    render() {
        return(
            <tr className="platform" onClick={() => {this.props.removeCallback(this.props.index)}}>
                <td className="content-platforms">
                    <img src={pIcons[this.props.platform].src} alt={pIcons[this.props.platform].alt}/>
                </td>
                <td className="remove-platform">
                    <FontAwesomeIcon className="fa fa-times-circle" icon={faTimesCircle}/>
                </td>
            </tr>
        );
    }
}