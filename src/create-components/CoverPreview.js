import React, { Component } from 'react';

export default class CoverPreview extends Component {
    render() {
        if (this.props.link === "") {
            return (<div className="preview-img">Image Preview</div>);
        } else {
            return (
                <div className="cover-container content">
                    <img src={this.props.link} alt={this.props.alt}/>
                </div>           
            );
        }
    }
}