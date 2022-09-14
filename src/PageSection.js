import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import pIcons from "./PlatformIcons";

// Creates a page section component that renders content and subsections of the PageNav using the 
// summary information that has been passed in with a prop from the PageNav component
class PageSection extends Component {
    render() {

        let index = -1;
        let summaryObj = this.props.page.summary;
        let summaryKeys = Object.keys(summaryObj);
        let summaryArray = summaryKeys.map((key) => {
            return summaryObj[key];
        })
        let summaryParagraphs = (summaryArray).map((summaryText) => {
            index++;
            return (
                <p key={index} className="summary-text">{summaryText}</p>
            );
        });

        let subObj = this.props.page.subs;
        let subKeys = Object.keys(subObj);

        // Do not include external links subsection!
        let filteredSubKeys = subKeys.filter((key) => key !== "external");

        let subArray = filteredSubKeys.map((key) => {
            return subObj[key];
        });

        let subComponents = subArray.map((subsection) => {
            return (
                <SubSection key={subsection.name} type={subsection.name} screenshot={subsection.screenshot}
                subtext={subsection.subtext}/>
            );
        });

        return (
            <section className="content-page">
                <div className="content-container">
                    <section className="summary">
                        <h2 className="game-title content">
                            {this.props.title}
                        </h2>
                        <SummaryBox box={this.props.page.box}/>
                        {summaryParagraphs}
                    </section>
                    <section className="content-tabs">
                        {subComponents}
                        <ExternalSubSection links={this.props.page.subs.external.links}/>
                    </section>
                </div>
            </section>
        );
    }
}

// Creates a summary box component that renders a summary box with its information and content from a
// passed prop in the PageSection component
class SummaryBox extends Component {
    render() {
        let devObj = this.props.box.developers;
        let devKeys = Object.keys(devObj);
        let devArray = devKeys.map((key) => {
            return devObj[key];
        })
        let devs = (devArray).map((dev) => {
            return (
                <a key={dev.alt} href={dev.link}>{dev.alt}</a>
            );
        });

        let platObj = this.props.box.platforms;
        let platKeys = Object.keys(platObj);
        let platArray = platKeys.map((key) => {
            return platObj[key];
        })
        let platformIcons = (platArray).map((platform) => {
            return (
                <img key={platform} src={pIcons[platform].src} alt={pIcons[platform].alt}/>
            );
        });

        let relObj = this.props.box.releases;
        let relKeys = Object.keys(relObj);
        let relArray = relKeys.map((key) => {
            return relObj[key];
        })
        let releases = (relArray).map((release) => {
            return (
                <span key={release.client}>{release.client + ": " + release.date}</span>
            );
        });

        let clientObj = this.props.box.clients;
        let clientKeys = Object.keys(clientObj);
        let clientArray = clientKeys.map((key) => {
            return clientObj[key];
        })
        let availables = (clientArray).map((provider) => {
            return (
                <a key={provider.alt} href={provider.link}>{provider.alt}</a>
            );
        });

        let tagObj = this.props.box.tags;
        let tagKeys = Object.keys(tagObj);
        let tagArray = tagKeys.map((key) => {
            return tagObj[key];
        })
        let tagString = tagArray[0];
        for (let i = 1; i < (tagArray).length; i++) {
            tagString += ", " + tagArray[i];
        }

        return (
            <div className="summary-box">
                <div className="cover-container content">
                    <img src={this.props.box.cover.link} alt={this.props.box.cover.alt}/>
                </div>
                <table className="attribute-container">
                    <tbody className="attribute-table">
                        <tr className="web-row">
                            <th>Official Website:</th>
                            <td className="content">
                                <a href={this.props.box.website.link}>{this.props.box.website.alt}</a>          
                            </td>
                        </tr>
                        <tr className="dev-row">
                            <th>Developer(s):</th>
                            <td className="content content-list">
                                {devs}                            
                            </td>
                        </tr>
                        <tr className="pub-row">
                            <th>Publisher:</th>
                            <td className="content">
                                <a href={this.props.box.publisher.link}>{this.props.box.publisher.alt}</a>
                            </td>                                   
                        </tr>
                        <tr className="plat-row">
                            <th>Platform(s):</th>
                            <td className="content content-platforms">
                                {platformIcons}
                            </td>
                        </tr>
                        <tr className="rel-row">
                            <th>Release Date:</th>
                            <td className="content content-list">
                                {releases}
                            </td>                                   
                        </tr>
                        <tr className="avail-row">
                            <th>Available On:</th>
                            <td className="content content-list">
                                {availables}
                            </td>
                        </tr>
                        <tr className="tag-row">
                            <th>Tags:</th>
                            <td className="content content-tags">
                                <span>{tagString}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

// Creates a sub-section component that can toggle (expand and retract) its information and content,
// of which come from a prop passed in by the PageSection component
class SubSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hide: true
        }
    }
    
    // Returns a String that determines if
    // a given html tag should be hidden or not.
    isHiddenString = () => {
        let hide = "";
        if (this.state.hide) {
            hide = " hidden";
        }
        return hide;
    }

    // Toggles whether component should be displayed or not.
    toggleHide = () => {
        this.setState({hide: !this.state.hide});
    }

    // Returns appropriate FontAweSomeIcon component based on if
    // component is hidden or not.
    getIcon = () => {
        if (this.state.hide) {
            return (<FontAwesomeIcon className={"fa fa-chevron-down"} icon={faChevronDown}/>);
        } else {
            return (<FontAwesomeIcon className={"fa fa-chevron-up"} icon={faChevronUp}/>);
        }
    }

    // Returns a String that is the component's props.type, but as a capitalized String/
    buildTypeString = () => {
        return ((this.props.type).charAt(0).toUpperCase() + (this.props.type).slice(1));
    }

    render() {
        return (
            <div className="content-sub-container" role="button" tabIndex="0" onClick={this.toggleHide}>
                <div className="content-sub">
                    <div className="content-icon-container">
                        {this.getIcon()}
                    </div>
                    <h3 className="content-sub-title">{this.buildTypeString()}</h3>
                </div>

                <section className={this.props.type + "-sub content-sub-section content" + this.isHiddenString()}>
                    <SubScreenShot screenshot={this.props.screenshot}/>
                    <SubText subtext={this.props.subtext}/>             
                </section>
            </div>
        );
    }
}

// Creates an external sub-section component that renders links to more information about games, 
// retrieved from the prop passed in the PageSection component
class ExternalSubSection extends SubSection {
    render() {

        let linkObj = this.props.links;
        let linkKeys = Object.keys(linkObj);
        let linkArray = linkKeys.map((key) => {
            return linkObj[key];
        });

        let exLinks = (linkArray).map((exLink) => {
            return (
                <a key={exLink.alt} href={exLink.link} alt={exLink.alt}>{exLink.alt}</a>
            );
        });

        return (
            <div className="content-sub-container" role="button" tabIndex="0" onClick={this.toggleHide}>
                <div className="content-sub">
                    <div className="content-icon-container">
                        {this.getIcon()}
                    </div>
                    <h3 className="content-sub-title">External Links</h3>
                </div>

                <section className={"external-sub content-sub-section content" + this.isHiddenString()}>
                    {exLinks}            
                </section>
            </div>
        );
    }
}

// Creates a sub-text component that renders the text descriptions provided in each sub-section component
class SubText extends Component {
    render() {
        let index = -1;

        let textObj = this.props.subtext;
        let textKeys = Object.keys(textObj);
        let textArray = textKeys.map((key) => {
            return textObj[key];
        });

        let subParagraphs = (textArray).map((paragraph) => {
            index++;
            return (
                <p key={index} className="content-sub-text">{paragraph}</p>
            );
        });

        return (
            <div>
                {subParagraphs}
            </div>
        );
    }
}

// Creates a sub-screenshot component that renders a screenshot container with an image and caption of the gameplay
// both of which are provided by the passed prop in the PageSection component
class SubScreenShot extends Component {
    render() {
        if (this.props.screenshot) {
            return (
                <div className="screenshot-container">
                    <img src={this.props.screenshot.link} alt={this.props.screenshot.alt}/>
                    <p className="screenshot-caption">{this.props.screenshot.caption}</p>
                </div>
            );
        } else {
            return (
                <div className="hidden"></div>
            );
        }
    }
}

export default PageSection;
