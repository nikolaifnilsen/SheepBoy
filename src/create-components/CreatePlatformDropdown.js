import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

export default class CreatePlatformDropdown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hideDropdown: true
        }
    }

    hide = () => {
        this.setState({hideDropdown: true});
    }

    show = () => {
        this.setState({hideDropdown: false});
    }

    render() {

        let hideClass = "";
        if (this.state.hideDropdown) {
            hideClass = " hidden";
        }

        return(
            <tbody className="add-platform">
                <tr className="att-dropdown-container" onMouseLeave={this.hide}>
                    <th onClick={this.show}>Add Platform<FontAwesomeIcon className="fa fa-angle-down" icon={faAngleDown}/></th>
                    <td className={"attribute-dropdown-content" + hideClass}>
                        <PlatformOption platform="ios" addCallback={this.props.addCallback} hideCallback={this.hide}/>
                        <PlatformOption platform="android" addCallback={this.props.addCallback} hideCallback={this.hide}/>
                        <PlatformOption platform="nintendo" addCallback={this.props.addCallback} hideCallback={this.hide}/>
                        <PlatformOption platform="playstation" addCallback={this.props.addCallback} hideCallback={this.hide}/>
                        <PlatformOption platform="xbox" addCallback={this.props.addCallback} hideCallback={this.hide}/>
                        <PlatformOption platform="windows" addCallback={this.props.addCallback} hideCallback={this.hide}/>
                        <PlatformOption platform="mac" addCallback={this.props.addCallback} hideCallback={this.hide}/>
                        <PlatformOption platform="linux" addCallback={this.props.addCallback} hideCallback={this.hide}/>
                    </td>
                </tr>
            </tbody>
        );
    }
}

class PlatformOption extends Component {
    render() {
        let platform = this.props.platform;
        let capitalizedPlatform = platform.charAt(0).toUpperCase() + platform.slice(1);

        let cssID = "";
        if (platform === "ios") {
            cssID = "first";
            capitalizedPlatform = "iOS";
        } else if (platform === "linux") {
            cssID = "last";
        }

        return (
            <div className="att-option" id={cssID} role="listitem" aria-label={platform} 
            tabIndex="0" onClick={() => {
                this.props.addCallback(platform);
                this.props.hideCallback();
            }}>
                {capitalizedPlatform}
            </div>
        );
    }
}