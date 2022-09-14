import React, { Component } from 'react';

// Creates a gameboy inputs component that renders the gameboy buttons on a page
class GameboyInputs extends Component {
    render() {
        return (
            <section className="gameboy-inputs">
                <div className="site-imprint-container">
                    <h4 className="site-imprint">SheepBoy</h4>
                    <p className="copyright-symbol">&copy;</p>
                </div>
                <div className="gameboy-button-container">
                    <div className="dpad-container"></div>
                    <div className="b-a-container">
                        <div className="b-container"></div>
                        <div className="a-container"></div>
                    </div>
                </div>
                <div className="gameboy-menu-container">
                    <div className="select-container"></div>
                    <div className="start-container"></div>
                </div>
            </section>
        );
    }
}

export default GameboyInputs;