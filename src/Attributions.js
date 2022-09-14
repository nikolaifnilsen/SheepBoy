import React, { Component } from 'react';

// Creates an attributes component and renders attribution links and contact information on a page
class Attributes extends Component {
    render() {
        return(
            <section className="attributions">
                <div className="attributions-container">
                    <h4 className="attributions-title">Icons From:</h4>
                    <ul className="attributions-list">
                        <li><a className="attributions-link" role="navigation" aria-label="fontawesome link" rel="noopener noreferrer" href="https://fontawesome.com/v4.7.0/" target="_blank">FontAwesome 4</a></li>
                        <li><a className="attributions-link" role="navigation" aria-label="icon library link" rel="noopener noreferrer" href="https://icon-library.net" target="_blank">icon-library.net</a></li>
                        <li><a className="attributions-link" role="navigation" aria-label="flaticon link" rel="noopener noreferrer" href="https://www.flaticon.com" target="_blank">flaticon.com</a></li>
                        <li><a className="attributions-link" role="navigation" aria-label="shareicon link" rel="noopener noreferrer" href="https://www.shareicon.net" target="_blank">shareicon.net</a></li>
                    </ul>
                </div>
                <div className="attributions-container">
                    <h4 className="attributions-title">Contact Us!</h4>
                    <ul className="attributions-list">
                        <li>Frank: ez43tl99@uw.edu</li>
                        <li>Hojun: hojunkim@uw.edu</li>
                    </ul>
                </div>
            </section>
        );
    }
}

export default Attributes;