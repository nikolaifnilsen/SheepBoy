import React, { Component } from 'react';
import CreateCover from "./CreateCover";
import CoverPreview from "./CoverPreview";
import CreateAttributes from "./CreateAttributes";
import CreateSearch from "./CreateSearch";

export default class CreatePageBox extends Component {
    render() {
        return (
            <div className="right-content">
                <div className="edit-summary-box">
                    <CreateCover link={this.props.pageState.coverLink} alt={this.props.pageState.coverAlt} linkCallback={this.props.coverLinkCallback} altCallback={this.props.coverAltCallback}/>
                    <CoverPreview link={this.props.pageState.coverLink} alt={this.props.pageState.coverAlt}/>
                    <CreateAttributes pageState={this.props.pageState} callbacks={this.props.callbacks}/>
                </div>
                <CreateSearch pageState={this.props.pageState} changeCallback={this.props.callbacks.changeSearchImg}/>
            </div>
        );
    }
}