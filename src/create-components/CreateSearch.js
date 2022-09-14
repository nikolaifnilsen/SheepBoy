import React, { Component } from 'react';
import SearchPreview from './SearchPreview';

export default class CreateSearch extends Component {

    handleChange = (event) => {
        let linkText = event.target.value;

        this.props.changeCallback(linkText);
    }

    render() {
        let devObj = this.props.pageState.developers;
        let devKeys = Object.keys(devObj);
        let devArray = devKeys.map((key) => {
            return devObj[key].alt;
        });

        let platObj = this.props.pageState.platforms;
        let platKeys = Object.keys(platObj);
        let platArray = platKeys.map((key) => {
            return platObj[key];
        });

        return (
            <div className="img-preview-container">
                <div className="img-link-input-box">
                    Search Box Image Link: 
                    <input className="link-input" type="text" onChange={this.handleChange} 
                    value={this.props.pageState.searchImage}/>
                </div>
                <SearchPreview cover={this.props.pageState.searchImage} title={this.props.pageState.title}
                developers={devArray} platforms={platArray}/>
            </div>
        );
    }
}