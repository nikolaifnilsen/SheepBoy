import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

// Creates a tag navigation component that renders a tag container with tag options
class TagNav extends Component {
    render() {
        let tags = (this.props.tags).map((tag) => {
            return (
                <Tag key={tag} tag={tag} removeTagCallback={this.props.removeTagCallback}/>
            );
        });

        let hide = "";
        if (this.props.hide) {
            hide = " hidden";
        }

        return (
            <nav className={"tag-container" + hide}>
                <p>Tags:</p>
                {tags}
            </nav>
        );
    }
}

// Creates a tag component that renders a removeable applied tag option once
// clicked on by the user in the tag dropdown from the FilterNav component
// The tag's content comes from the passed prop in the TagNav component
class Tag extends Component {
    render() {
        return (
            <div className="tag" role="button" tabIndex="0" 
            onClick={() => {this.props.removeTagCallback(this.props.tag)}}>
                <p>{this.props.tag}</p>
                <button className="tag-button">
                    <FontAwesomeIcon icon={faTimesCircle} />
                </button>
            </div>
        );
    }
}

export default TagNav;