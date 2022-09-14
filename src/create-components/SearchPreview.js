import React, { Component } from 'react';
import {getAlt} from './../FilterFunctions';
import pIcons from './../PlatformIcons';

export default class SearchPreview extends Component {
    render() {
        let platformIcons = (this.props.platforms).map((platform) => {
            return (
                <img key={platform} src={pIcons[platform].src} alt={pIcons[platform].alt} />
            );
        });

        let devs = this.props.developers;
        let devLine = devs[0];

        // If there are more developers, add them to final string.
        for (let i = 1; i < devs.length; i++) {
            devLine += ", " + devs[i];
        }

        return (
            <div className="result-preview">
                <div className="result-container">
                    <div className="result-cover-container">
                        <img src={this.props.cover} alt={getAlt(this.props.title)}/>
                    </div>
                    <h2 className="result-game-title">{this.props.title}</h2>
                    <h3 className="result-developers">{devLine}</h3>
                    <div className="result-platform-container">
                        {platformIcons}
                    </div>
                </div>
            </div>
        );
    }
}