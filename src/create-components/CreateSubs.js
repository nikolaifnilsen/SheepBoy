import React, { Component } from 'react';
import CreateSubsection from './CreateSubsection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export default class CreateSubs extends Component {
    render() {
        let subSections = this.props.pageState.subs;
        let subKeys = Object.keys(subSections);
        let subComponents = subKeys.map((key) => {
            // external subsection handled separately.
            if (key !== "external") {
                return (
                    <CreateSubsection key={key} index={key} obj={subSections[key]} 
                    changeCallback={this.props.callbacks.changeSub}
                    removeCallback={this.props.callbacks.removeSub}/>
                );
            }
        });

        return(
            <section className="content-tabs">
                {subComponents}
                <div className="content-add" role="button" onClick={() => {this.props.callbacks.addSub()}}>
                    <h3 className="content-sub-title temp">Add Subsection</h3>
                </div>
                <ExternalSub links={this.props.pageState.subs.external.links} 
                addCallback={this.props.callbacks.addExLink}
                changeCallback={this.props.callbacks.changeExLink} 
                removeCallback={this.props.callbacks.removeExLink}/>
            </section>
        );
    }
}

class ExternalSub extends Component {

    handleLinkChange = (event, index) => {
        let linkText = event.target.value;
        
        this.props.changeCallback(index, linkText, this.props.links[index].alt);
    }

    handleAltChange = (event, index) => {
        let altText = event.target.value;
        
        this.props.changeCallback(index, this.props.links[index].link, altText);
    }

    render() {
        let exLinks = this.props.links;
        let exKeys = Object.keys(exLinks);
        let exLinkComponents = exKeys.map((key) => {
            return (
                <div className="link-container" key={key}>
                    <div className="remove-element" onClick={() => {this.props.removeCallback(key)}}>
                        <FontAwesomeIcon className="fa fa-times-circle" icon={faTimesCircle} aria-hidden="true"/>
                    </div>
                    <p>
                        External Link: 
                        <input className="link-input" type="text" onChange={(event) => this.handleLinkChange(event, key)}
                        value={exLinks[key].link}/>
                    </p>
                    <p>
                        External Link Text: 
                        <input className="link-input" type="text" onChange={(event) => this.handleAltChange(event, key)}
                        value={exLinks[key].alt}/>
                    </p>
                </div>
            );
        });

        return (
            <div>
                <div className="edit-content-sub" role="button">
                    <h3 className="content-sub-title temp">External Links</h3>
                </div>
                <section className="additional-section">
                    {exLinkComponents}
                    <div className="add" onClick={this.props.addCallback}>Add External Link</div>
                </section>
            </div>
        );
    }
}