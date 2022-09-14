import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

// Creates an applied filter container that renders removeable filters that have been applied from the 
// FilterNav's dropdown lists
class AppliedNav extends Component {
    render() {
        let hide = "";
        if (this.props.hide) {
            hide = " hidden";
        }
        return (
            <nav className={"applied-container" + hide}>
                <h2>
                    <span className="applied-label prefix"><p>Searching:</p></span>
                    <AppliedSort sort={this.props.searchState.sort} sortCallback={this.props.filterCallbacks.sortCallback}/>
                    <span className="applied-label game">Games</span>
                    <AppliedPublisher publisher={this.props.searchState.publisher} publisherCallback={this.props.filterCallbacks.publisherCallback}/>
                    <AppliedPlatform platform={this.props.searchState.platform} platformCallback={this.props.filterCallbacks.platformCallback}/>
                    <AppliedSearch search={this.props.searchState.search} searchCallback={this.props.filterCallbacks.searchCallback}/>
                </h2>
            </nav>
        );
    }
}

// Creates a removeable applied filter element from the selected 'Sort By' dropdown option
class AppliedSort extends Component {
    render() {
        let hidden = "";
        if (this.props.sort === "") {
            hidden = " hidden";
        }

        return (
            <span role="button" tabIndex="0" className={"applied-label sort" + hidden}
            onClick={() => {this.props.sortCallback("")}}>
                <p>{this.props.sort}</p>
                <button className="delete-button">
                    <FontAwesomeIcon icon={faTimesCircle}/>
                </button>
            </span>
        );
    }
}

// Creates a removeable applied filter element from the selected 'Publisher' dropdown option
class AppliedPublisher extends Component {
    render() {
        let hidden = "";
        if (this.props.publisher === "") {
            hidden = " hidden";
        }

        return (
            <span role="button" tabIndex="0" className={"applied-label publisher" + hidden}
            onClick={() => {this.props.publisherCallback("")}}>
                <p>{"by " + this.props.publisher}</p>
                <button className="delete-button">
                    <FontAwesomeIcon icon={faTimesCircle}/>
                </button>
            </span>
        );
    }
}

// Creates a removeable applied filter element from the selected 'Platform' dropdown option
class AppliedPlatform extends Component {
    render() {
        let hidden = "";
        if (this.props.platform === "") {
            hidden = " hidden";
        }

        return (
            <span role="button" tabIndex="0" className={"applied-label platform" + hidden}
            onClick={() => {this.props.platformCallback("")}}>
                <p>{"on " + this.props.platform}</p>
                <button className="delete-button">
                    <FontAwesomeIcon icon={faTimesCircle}/>
                </button>
            </span>
        );
    }
}

// Creates a removeable applied filter element from the user's submitted search input
class AppliedSearch extends Component {
    render() {
        let hidden = "";
        if (this.props.search === "") {
            hidden = " hidden";
        }

        return (
            <span role="button" tabIndex="0" className={"applied-label search" + hidden}
            onClick={() => {this.props.searchCallback("")}}>
                <p>{"containing '" + this.props.search + "'"}</p>
                <button className="delete-button">
                    <FontAwesomeIcon icon={faTimesCircle}/>
                </button>
            </span>
        );
    }
}

export default AppliedNav;