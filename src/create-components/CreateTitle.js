import React, { Component } from 'react';

export default class CreateTitle extends Component {

    handleChange = (event) => {
        let titleText = event.target.value;
        this.props.titleCallback(titleText);
    }

    render() {
        return (
            <h2 className="game-title">
                <input className="game-title-input" placeholder="ADD GAME TITLE"
                value={this.props.titleText} onChange={this.handleChange}></input>
            </h2>
        );
    }
}