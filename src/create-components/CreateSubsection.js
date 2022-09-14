import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export default class CreateSubsection extends Component {

    constructor(props) {
        super(props);

        let hideButtonInitial = false;
        if (this.props.obj.screenshot.link !== "" || this.props.obj.screenshot.link !== ""
        || this.props.obj.screenshot.link !== "") {
            hideButtonInitial = true;
        }

        this.state = {
            hideScreenshotButton: hideButtonInitial,
            hideScreenshot: !hideButtonInitial
        }
    }

    // Updates this section's title based on value in given event.
    handleTitleChange = (event) => {
        let titleText = event.target.value;
        let newSubObj = this.props.obj;
        newSubObj.name = titleText;

        this.props.changeCallback(this.props.index, newSubObj);
    }

    handleParagraphChange = (event, index) => {
        let pText = event.target.value;
        this.changeSubParagraph(index, pText);
    }

    // Adds new subtext paragraph to this subsection.
    addSubParagraph = () => {
        let newSubText = this.props.obj.subtext;
        let newNum = this.props.obj.textNum + 1;
        newSubText[newNum] = "";

        let newSubObj = this.props.obj;
        newSubObj.subtext = newSubText;
        newSubObj.textNum = newNum;
        this.props.changeCallback(this.props.index, newSubObj);
    }

    // Changes subtext paragraph at given index in this subsection.
    changeSubParagraph = (index, text) => {
        let newSubText = this.props.obj.subtext;
        newSubText[index] = text;

        let newSubObj = this.props.obj;
        newSubObj.subtext = newSubText;
        this.props.changeCallback(this.props.index, newSubObj);
    }

    // Removes subtext paragraph at given index in this subsection.
    removeSubParagraph = (index) => {
        let newSubText = this.props.obj.subtext;
        delete newSubText[index];

        let newSubObj = this.props.obj;
        newSubObj.subtext = newSubText;
        this.props.changeCallback(this.props.index, newSubObj);
    }

    // Renders the screenshot and hides the add screenshot button
    // inside this subsection.
    addScreenshot = () => {
        this.setState({hideScreenshotButton: true, hideScreenshot: false});
    }

    // Changes the values of the screenshot object within this subsection.
    changeScreenshot = (link, alt, caption) => {
        let newScreenshot = this.props.obj.screenshot;
        newScreenshot.link = link;
        newScreenshot.alt = alt;
        newScreenshot.caption = caption;

        let newSubObj = this.props.obj;
        newSubObj.screenshot = newScreenshot;
        this.props.changeCallback(this.props.index, newSubObj);
    }

    // Renders the add screenshot button, hides the screenshot, and
    // resets its values to empty Strings.
    removeScreenshot = () => {
        let newScreenshot = this.props.obj.screenshot;
        newScreenshot.link = "";
        newScreenshot.alt = "";
        newScreenshot.caption = "";

        let newSubObj = this.props.obj;
        newSubObj.screenshot = newScreenshot;
        this.setState({hideScreenshotButton: false, hideScreenshot: true});
        this.props.changeCallback(this.props.index, newSubObj);
    }


    // Changes the screenshot link of this subsection to the
    // value inside given event.
    handleLinkChange = (event) => {
        let newLink = event.target.value;
        let newScreenshot = this.props.obj.screenshot;
        newScreenshot.link = newLink;

        let newSubObj = this.props.obj;
        newSubObj.screenshot = newScreenshot;
        this.props.changeCallback(this.props.index, newSubObj);
    }

    // Changes the screenshot alt text of this subsection to the
    // value inside given event.
    handleAltChange = (event) => {
        let newAlt = event.target.value;
        let newScreenshot = this.props.obj.screenshot;
        newScreenshot.alt = newAlt;

        let newSubObj = this.props.obj;
        newSubObj.screenshot = newScreenshot;
        this.props.changeCallback(this.props.index, newSubObj);
    }

    // Changes the screenshot caption of this subsection to the
    // value inside given event.
    handleCaptionChange = (event) => {
        let newCaption = event.target.value;
        let newScreenshot = this.props.obj.screenshot;
        newScreenshot.caption = newCaption;

        let newSubObj = this.props.obj;
        newSubObj.screenshot = newScreenshot;
        this.props.changeCallback(this.props.index, newSubObj);
    }

    render() {
        let subParagraphs = this.props.obj.subtext;
        let subPKeys = Object.keys(subParagraphs);
        let subPComponents = subPKeys.map((key) => {
            return (
                <div className="edit-content-sub-text" key={key}>
                    <textarea rows="12" cols="55" onChange={(event) => {this.handleParagraphChange(event, key)}}
                    value={subParagraphs[key]}></textarea>
                    <button className="content-button" onClick={() => {this.removeSubParagraph(key)}}>
                        <FontAwesomeIcon className="fa fa-times-circle" icon={faTimesCircle} aria-hidden="true"/>
                    </button>
                </div>
            );
        });

        let buttonClass = "";
        if (this.state.hideScreenshotButton) {
            buttonClass = " hidden";
        }

        let screenClass = "";
        if (this.state.hideScreenshot) {
            screenClass = " hidden";
        }

        return(
            <div>
                <div className="edit-content-sub" role="button">
                    <h3 className="content-sub-title temp">
                        <input className="content-title-input" placeholder="Add Subsection Title"
                        onChange={this.handleTitleChange} value={this.props.obj.name}/>
                    </h3>
                    <div className="remove-subsection">
                        <FontAwesomeIcon className="fa fa-times-circle" icon={faTimesCircle} aria-hidden="true"
                        onClick={() => {this.props.removeCallback(this.props.index)}}/>
                    </div>
                </div>
                <section className="content-sub-section">
                    <div className={"screenshot-container" + screenClass}>
                        <button className="content-button" onClick={() => {this.removeScreenshot()}}>
                            <FontAwesomeIcon className="fa fa-times-circle" icon={faTimesCircle} aria-hidden="true"/>
                        </button>
                        <table className="attribute-container">
                            <tbody className="attribute-table">
                                <tr>
                                    <th>Screenshot Link:</th>
                                    <td>
                                        <input className="attribute-input" type="text" onChange={this.handleLinkChange}
                                        value={this.props.obj.screenshot.link}/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Screenshot Alt Text:</th>
                                    <td>
                                        <input className="attribute-input" type="text" onChange={this.handleAltChange}
                                        value={this.props.obj.screenshot.alt}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <img src={this.props.obj.screenshot.link} alt={this.props.obj.screenshot.alt}/>
                        <textarea rows="4" cols="55" onChange={this.handleCaptionChange} value={this.props.obj.screenshot.caption}></textarea>
                    </div>
                    {subPComponents}
                    <div className="add" role="button" onClick={this.addSubParagraph}>Add Paragraph</div>
                    <div className={"add" + buttonClass} role="button" onClick={this.addScreenshot}>Add Screenshot</div>
                </section>
            </div>
        );
    }
}