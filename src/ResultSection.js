import React, { Component } from 'react';
import {getAlt} from './FilterFunctions';
import pIcons from './PlatformIcons';
import 'firebase/database';

// Creates a result section component that renders the container of gamebox results 
export class ResultSection extends Component {
    render() {
        let hide = "";
        if (this.props.hide) {
            hide = " hidden";
        }

        let gameBoxes = (this.props.games).map((game) => {
            return (
                <GameBox key={game.id} game={game} gamesRef={this.props.gamesRef}
                pageCallback={this.props.pageCallback} 
                showCallback={this.props.showCallback}
                gameCallback={this.props.gameCallback}/>
            );
        });

        return (
            <section className={"result" + hide}>
                {gameBoxes}
            </section>
        );
    }
}

// Creates a gamebox component that renders a gamebox's components using the information provided in the 
// passed prop from the ResultSection component
class GameBox extends Component {

    // When box is selected, increment its view count in firebase database.
    // Incidentally, this implementation prevents spam-incrementing within
    // the same session! (since this.props.views never changes until after page
    // is reloaded!)
    incrementViewCount = () => {
        let currentGameRef = this.props.gamesRef.child(this.props.game.id);
        currentGameRef.update({views: this.props.game.views + 1})
            .catch(err => this.props.errorCallback(err));
    }

    render() {
        
        let platformIcons = (this.props.game.platforms).map((platform) => {
            return (
                <img key={platform} src={pIcons[platform].src} alt={pIcons[platform].alt} />
            );
        });

        let devLine = this.props.game.developers[0];

        // If there are more developers, add them to final string.
        for (let i = 1; i < this.props.game.developers; i++) {
            devLine += ", " + this.props.game.developers[i];
        }

        return (
            <div className="result-container" role="button" tabIndex="0" 
            onClick={() => {
                this.props.pageCallback(this.props.game.title);
                this.props.gameCallback(this.props.game);
                this.props.showCallback();
                this.incrementViewCount();
            }}>
                <div className="result-cover-container">
                    <img src={this.props.game.cover} alt={getAlt(this.props.game.cover)}/>
                </div>
                <h2 className="result-game-title">{this.props.game.title}</h2>
                <h3 className="result-developers">{devLine}</h3>
                <div className="result-platform-container">
                    {platformIcons}
                </div>
            </div>
        );
    }
}

export default ResultSection;