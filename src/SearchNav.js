import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// Creates a search navigation component that renders a search bar container with a clickable button
// The button triggers an event that will take in the updated input from the SearchBar component
// and pass the input to the app's search callback function to update the app's state
class SearchNav extends Component {
    constructor(props) {
        super(props);
        
        this.state = {input: ''};
    }

    // Takes this state's input and moves it to the app's search callback
    exportInput = () => {
        let searchInput = this.state.input;

        this.props.searchCallback(searchInput);
    }
    
    // Takes the passed search input and updates this component's current state input
    importInput = (searchTerm) => {
        this.setState({input: searchTerm});
    }

    render() {
        let hide = "";
        if (this.props.hide) {
            hide = " hidden";
        }

        return (
            <nav className={"search-container" + hide}>
                <div className="search-bar" role="search">
                    <SearchBar searchImportCallback={this.importInput}/>
                    <button className="search-button" onClick={this.exportInput} aria-label="search button"><FontAwesomeIcon icon={faSearch} /></button>
                    {/* <i aria-label="search" className="fa fa-search fa-flip-horizontal" aria-hidden="true"></i> */}
                </div>
            </nav>
        );
    }
}

// Creates a search bar component that renders the search bar box and updates the user's inputs as he/she is typing
// into the component's state and passes the state's updated input up to the SearchNav component
class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {input: ''};
    }

    // Takes user input and updates this component's state input and passes it into the passed prop's search import callback
    updateInput = (event) => {
        let newInput = event.target.value;
  
        this.setState({input: newInput});
        this.props.searchImportCallback(newInput);
     }

    render() {
        return(
            <input className="search-input" type="text" role="search" aria-label="search input box" placeholder="Search by Title of Developer" onChange={this.updateInput}></input>
        );
    }
}

export default SearchNav;