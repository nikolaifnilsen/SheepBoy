import React, { Component } from 'react';
import FixedAttribute from './FixedAttribute';
import RemovableAttribute from './RemovableAttribute';
import CreatePlatformIcon from './CreatePlatformIcon';
import CreatePlatformDropdown from './CreatePlatformDropdown';
import CreateRelease from './CreateRelease';
import CreateTag from './CreateTag';

export default class CreateAttributes extends Component {

    getDevComponents = () => {
        let devs = this.props.pageState.developers;
        let devKeys = Object.keys(devs);
        let devComponents = devKeys.map((key) => {   
            return (
                <RemovableAttribute key={key} index={key} obj={devs[key]} 
                linkTitle="Developer Link:" altTitle="Developer Name:"
                changeCallback={this.props.callbacks.changeDev} 
                removeCallback={this.props.callbacks.removeDev}/>
            );
        });
        return devComponents;
    }

    getPlatComponents = () => {
        let platforms = this.props.pageState.platforms;
        let platKeys = Object.keys(platforms);
        let platComponents = platKeys.map((key) => {
            return (
                <CreatePlatformIcon key={key} index={key} platform={platforms[key]} removeCallback={this.props.callbacks.removePlat}/>
            );
        });
        return platComponents;
    }

    getRelComponents = () => {
        let rels = this.props.pageState.releases;
        let relKeys = Object.keys(rels)
        let relComponents = relKeys.map((key) => {
            return (
                <CreateRelease key={key} index={key} obj={rels[key]} 
                linkTitle="Release Date:" altTitle="Release Client:"
                changeCallback={this.props.callbacks.changeRel} 
                removeCallback={this.props.callbacks.removeRel}/>
            );
        });
        return relComponents;
    }

    getClientComponents = () => {
        let clients = this.props.pageState.clients;
        let clientKeys = Object.keys(clients);
        let clientComponents = clientKeys.map((key) => {   
            return (
                <RemovableAttribute key={key} index={key} obj={clients[key]} 
                linkTitle="Client Link:" altTitle="Client Name:"
                changeCallback={this.props.callbacks.changeClient} 
                removeCallback={this.props.callbacks.removeClient}/>
            );
        });
        return clientComponents;
    }

    getTagComponents = () => {
        let tags = this.props.pageState.tags;
        let tagKeys = Object.keys(tags);
        let tagComponents = tagKeys.map((key) => {
            return (
                <CreateTag key={key} index={key} tagText={tags[key]}
                changeCallback={this.props.callbacks.changeTag}
                removeCallback={this.props.callbacks.removeTag}/>
            );
        });
        return tagComponents;
    }

    render() {
        
        return(
            <table className="attribute-container">

                {/*Official Website Inputs*/}
                <FixedAttribute link={this.props.pageState.webLink} alt={this.props.pageState.webAlt} linkTitle="Official Website Link:" altTitle="Official Website Name:"
                linkCallback={this.props.callbacks.webLink} altCallback={this.props.callbacks.webAlt}/> 

                {/*Developer Inputs*/}
                {this.getDevComponents()}
                <tbody className="attribute-add" role="button" onClick={() => {this.props.callbacks.addDev()}}>
                    <tr>
                        <th>Add Developer</th>
                    </tr>
                </tbody>

                {/*Publisher Inputs*/}
                <FixedAttribute link={this.props.pageState.pubLink} alt={this.props.pageState.pubAlt} linkTitle="Publisher Link:" altTitle="Publisher Name:"
                linkCallback={this.props.callbacks.pubLink} altCallback={this.props.callbacks.pubAlt}/> 

                {/*Platform Inputs*/}
                <tbody className="attribute-table">
                    {this.getPlatComponents()}
                </tbody>
                <CreatePlatformDropdown addCallback={this.props.callbacks.addPlat}/>

                {/*Release Date Inputs*/}
                {this.getRelComponents()}
                <tbody className="attribute-add" role="button" onClick={() => {this.props.callbacks.addRel()}}>
                    <tr>
                        <th>Add Release Date</th>
                    </tr>
                </tbody>

                {/*Client Inputs*/}
                {this.getClientComponents()}
                <tbody className="attribute-add" role="button" onClick={() => {this.props.callbacks.addClient()}}>
                    <tr>
                        <th>Add Client</th>
                    </tr>
                </tbody>

                {/*Tag Inputs*/}
                {this.getTagComponents()}
                <tbody className="attribute-add" role="button" onClick={() => {this.props.callbacks.addTag()}}>
                    <tr>
                        <th>Add Tag</th>
                    </tr>
                </tbody>
            </table>
        );
    }
}