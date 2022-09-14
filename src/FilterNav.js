import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

// Creates a filter navigation component and renders each filter type's dropdown content
class FilterNav extends Component {

    render() {
        let hide = "";
        if (this.props.hide) {
            hide = " hidden";
        }

        return (
            <nav className={"filter-container" + hide}>
                <TagDropdown tags={this.props.tags} 
                addTagCallback={this.props.filterCallbacks.addTagCallback}/>

                <SortDropdown sorts={this.props.sorts} 
                sortCallback={this.props.filterCallbacks.sortCallback}/>

                <PublisherDropdown publishers={this.props.publishers} 
                publisherCallback={this.props.filterCallbacks.publisherCallback}/>

                <PlatformDropdown platforms={this.props.platforms} 
                platformCallback={this.props.filterCallbacks.platformCallback}/>
            </nav>
        );
    }
}

// Creates a dropdown component that manages and updates the app's state elements 
class Dropdown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isShown: false
        }
    }

    // Updates the app's currentState to make the dropdown list visible
    changeShow = (isShown) => {
        this.setState((currentState) => {
            currentState.isShown = isShown;
            return currentState;
        });
    }
}

// Creates a tag dropdown component that renders a list of clickable tag options from a passed prop in the FilterNav component
class TagDropdown extends Dropdown {

    render() {

        let tagOptions = (this.props.tags).map((tag) => {
            return (
                <TagOption key={tag} tag={tag} addTagCallback={this.props.addTagCallback}/>
            );
        });

        let show = "";
        if (this.state.isShown) {
            show = " show";
        }

        return (
            <div className="dropdown" role="listbox" aria-label="activate dropdown" tabIndex="0"
            onClick={() => {this.changeShow(true)}} onMouseLeave={() => {this.changeShow(false)}}>
                <div className="drop-container"><p>Tags<FontAwesomeIcon className="fa fa-angle-down" icon={faAngleDown} /></p></div>
                <div className={"tag-dropdown dropdown-content" + show} role="list" aria-label="list of tags">
                    {tagOptions}
                </div>
            </div>
        );
    }
}

// Creates a tag option component that renders a clickable tag option and its content from a passed prop in the TagDropdown component
class TagOption extends Component {
    render() {
        return (
            <div className={"tag-option option"} onClick={() => {
                this.props.addTagCallback(this.props.tag);
            }} role="listitem" aria-label={this.props.tag} tabIndex="0">
                {this.props.tag}
            </div>
        );
    };
}

// Creates a sort dropdown component that renders a list of clickable sort options from a passed prop in the FilterNav component
class SortDropdown extends Dropdown {
    render() {
        
        let sortOptions = (this.props.sorts).map((sort) => {
            return (
                <SortOption key={sort} sort={sort} sortCallback={this.props.sortCallback}/>
            );
        });

        let show = "";
        if (this.state.isShown) {
            show = " show";
        }

        return (
            <div className="dropdown" role="listbox" aria-label="activate dropdown" tabIndex="0"
            onClick={() => {this.changeShow(true)}} onMouseLeave={() => {this.changeShow(false)}}>
                <div className="drop-container"><p>Sort By<FontAwesomeIcon className="fa fa-angle-down" icon={faAngleDown} /></p></div>
                <div className={"sort-dropdown dropdown-content" + show} role="list" aria-label="list of tags">
                    {sortOptions}
                </div>
            </div>
        );
    }
}

// Creates a sort option component that renders a clickable sort option and its content from a passed prop in the SortDropdown component
class SortOption extends Component {
    render() {
        return (
            <div className={"sort-option option"} onClick={() => {
                this.props.sortCallback(this.props.sort);
            }} role="listitem" aria-label={this.props.sort} tabIndex="0">
                {this.props.sort}
            </div>
        );
    }
}

// Creates a publisher dropdown component that renders a list of publishers from a passed prop in the FilterNav component
class PublisherDropdown extends Dropdown {
    render() {

        let pubOptions = (this.props.publishers).map((pub) => {
            return (
                <PublisherOption key={pub} publisher={pub} publisherCallback={this.props.publisherCallback}/>
            );
        });

        let show = "";
        if (this.state.isShown) {
            show = " show";
        }

        return (
            <div className="dropdown" role="listbox" aria-label="activate dropdown" tabIndex="0"
            onClick={() => {this.changeShow(true)}} onMouseLeave={() => {this.changeShow(false)}}>
                <div className="drop-container"><p>Publisher<FontAwesomeIcon className="fa fa-angle-down" icon={faAngleDown} /></p></div>
                <div className={"pub-dropdown dropdown-content" + show} role="list" aria-label="list of publishers">
                    {pubOptions}
                </div>
            </div>
        );
    }
}

// Creates a publisher option component that renders a clickable publisher option and its content from a passed prop in the PublisherDropdown component
class PublisherOption extends Component {
    render() {

        return (
            <div className={"pub-option option"} onClick={() => {
                this.props.publisherCallback(this.props.publisher);
            }} role="listitem" aria-label={this.props.publisher} tabIndex="0">
                {this.props.publisher}
            </div>
        );
    };
}

// Creates a platform dropdown component that renders a list of platforms from a passed prop in the FilterNav component
class PlatformDropdown extends Dropdown {
    render() {

        let platOptions = (this.props.platforms).map((platform) => {
            return (
                <PlatformOption key={platform} platform={platform} platformCallback={this.props.platformCallback}/>
            );
        });

        let show = "";
        if (this.state.isShown) {
            show = " show";
        }

        return (
            <div className="dropdown" role="listbox" aria-label="activate dropdown" tabIndex="0"
            onClick={() => {this.changeShow(true)}} onMouseLeave={() => {this.changeShow(false)}}>
                <div className="drop-container"><p>Platform<FontAwesomeIcon className="fa fa-angle-down" icon={faAngleDown} /></p></div>
                <div className={"platform-dropdown dropdown-content" + show} role="list" aria-label="list of platforms">
                    {platOptions}
                </div>
            </div>
        );
    }
}

// Creates a platform option component that renders a clickable platform option and its content from a passed prop in the PlatformDropdown component
class PlatformOption extends Component {
    render() {
        return (
            <div className={"plat-option option"} onClick={() => {
                this.props.platformCallback(this.props.platform);
            }} role="listitem" aria-label={this.props.platform} tabIndex="0">
                {this.props.platform}
            </div>
        );
    }
}

export default FilterNav;