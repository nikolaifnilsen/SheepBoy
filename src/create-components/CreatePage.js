import React, { Component } from 'react';
import CreateTitle from './CreateTitle';
import CreatePageBox from './CreatePageBox';
import CreateSummary from './CreateSummary';
import CreateSubs from './CreateSubs';

export default class CreatePage extends Component {

    // Changes the game title to given String.
    changeTitle = (titleText) => {
        let newPageObj = this.props.page;
        newPageObj.title = titleText;

        let newGameObj = this.props.game;
        newGameObj.title = titleText;

        this.props.pageCallback(newPageObj)
        this.props.gameCallback(newGameObj);
    }

    // Changes the image link shown on search page
    // to given String image link.
    changeSearchImageLink = (link) => {
        let newGameObj = this.props.game;
        newGameObj.cover = link;
        this.props.gameCallback(newGameObj);
    }

    // Change cover link to given String.
    changeCoverLink = (newLink) => {
        let newRecentPage = this.props.recentPage;
        newRecentPage.content.box.cover.link = newLink;
        this.props.recentCallback(newRecentPage);
    }

    // Change cover alt text to given String.
    changeCoverAlt = (newAlt) => {
        let newRecentPage = this.props.recentPage;
        newRecentPage.content.box.cover.alt = newAlt;
        this.props.recentCallback(newRecentPage);
    }

    // Change website link to given String.
    changeWebLink = (newLink) => {
        let newRecentPage = this.props.recentPage;
        newRecentPage.content.box.website.link = newLink;
        this.props.recentCallback(newRecentPage);
    }

    // Changes website alt text to given String.
    changeWebAlt = (newAlt) => {
        let newRecentPage = this.props.recentPage;
        newRecentPage.content.box.website.alt = newAlt;
        this.props.recentCallback(newRecentPage);
    }

    // Changes publisher link to given String.
    changePubLink = (newLink) => {
        let newRecentPage = this.props.recentPage;
        newRecentPage.content.box.publisher.link = newLink;

        this.props.recentCallback(newRecentPage);
    }

    // Changes publisher alt text to given String.
    changePubAlt = (newAlt) => {
        let newRecentPage = this.props.recentPage;
        newRecentPage.content.box.publisher.alt = newAlt;

        let newGameObj = this.props.game;
        newGameObj.publisher = newAlt;

        this.props.recentCallback(newRecentPage);
        this.props.gameCallback(newGameObj);
    }
    
    // Changes the game object's developers to be
    // those stored in given devObj containing them.
    changeGameObjDevelopers = (devObj) => {
        let newGameObj = this.props.game;
        let newDevs = {};
        let devKeys = Object.keys(devObj);
        devKeys.forEach((key) => {
            newDevs[key] = devObj[key].alt;
        });

        newGameObj.developers = newDevs;

        this.props.gameCallback(newGameObj);
    }

    // Adds an empty developer object to the state.
    addDeveloper = () => {
        let newRecentPage = this.props.recentPage;
        let num = newRecentPage.content.box.devNum; 
        
        newRecentPage.content.box.developers[num] = {
            link: "",
            alt: ""
        }   

        newRecentPage.content.box.devNum = num + 1;

        this.props.recentCallback(newRecentPage);
        this.changeGameObjDevelopers(newRecentPage.content.box.developers);
    } 

    // Changes the developer object at given index.
    changeDeveloper = (index, link, alt) => {
        let newRecentPage = this.props.recentPage;
        
        newRecentPage.content.box.developers[index] = {
            link: link,
            alt: alt
        }
        
        this.props.recentCallback(newRecentPage);
        this.changeGameObjDevelopers(newRecentPage.content.box.developers);
    }

    // Removes the developer object at given index.  
    removeDeveloper = (index) => {
        let newRecentPage = this.props.recentPage;
        
        delete newRecentPage.content.box.developers[index];
        
        this.props.recentCallback(newRecentPage);
        this.changeGameObjDevelopers(newRecentPage.content.box.developers);
    }

    // Changes the game object's platforms to be
    // those stored in given platObj containing them.
    changeGameObjPlatforms = (platObj) => {
        let newGameObj = this.props.game;
        newGameObj.platforms = platObj;

        this.props.gameCallback(newGameObj);
    }

    // Adds the given platform String.
    addPlatform = (platform) => {
        let newRecentPage = this.props.recentPage;
        let platExists = false;
        let currentPlatforms = newRecentPage.content.box.platforms;

        let platKeys = Object.keys(currentPlatforms);
        platKeys.forEach((key) => {
            if (currentPlatforms[key] === platform) {
                platExists = true;
            }
        });

        if (!platExists) {
            let num = newRecentPage.content.box.platNum; 
        
            newRecentPage.content.box.platforms[num] = platform;
            newRecentPage.content.box.platNum = num + 1;

            this.props.recentCallback(newRecentPage);
            this.changeGameObjPlatforms(newRecentPage.content.box.platforms);
        }
    }

    // Removes the platform String at given index  
    removePlatform = (index) => {
        let newRecentPage = this.props.recentPage;
        
        delete newRecentPage.content.box.platforms[index];
        
        this.props.recentCallback(newRecentPage);
        this.changeGameObjPlatforms(newRecentPage.content.box.platforms);
    }
    
    // Adds an empty release date object.
    addRelease = () => {
        let newRecentPage = this.props.recentPage;
        let num = newRecentPage.content.box.relNum; 
        
        newRecentPage.content.box.releases[num] = {
            client: "",
            date: ""
        }   

        newRecentPage.content.box.relNum = num + 1;

        this.props.recentCallback(newRecentPage);
    } 

    // Changes the release date object at given index.  
    changeRelease = (index, client, date) => {
        let newRecentPage = this.props.recentPage;
        
        newRecentPage.content.box.releases[index] = {
            client: client,
            date: date
        }   

        this.props.recentCallback(newRecentPage);
    }

    // Removes the release date object at given index. 
    removeRelease = (index) => {
        let newRecentPage = this.props.recentPage;
        
        delete newRecentPage.content.box.developers[index];

        this.props.recentCallback(newRecentPage);
    }

    // Adds an empty client object.
    addClient = () => {
        let newRecentPage = this.props.recentPage;
        let num = newRecentPage.content.box.clientNum; 
        
        newRecentPage.content.box.clients[num] = {
            link: "",
            alt: ""
        }   

        newRecentPage.content.box.clientNum = num + 1;

        this.props.recentCallback(newRecentPage);
    } 

    // Changes the client object at given index.
    changeClient = (index, link, alt) => {
        let newRecentPage = this.props.recentPage;
        
        newRecentPage.content.box.clients[index] = {
            link: link,
            alt: alt
        }   

        this.props.recentCallback(newRecentPage);
    }

    // Removes the client object at given index.
    removeClient = (index) => {
        let newRecentPage = this.props.recentPage;
       
        delete newRecentPage.content.box.clients[index];
        this.props.recentCallback(newRecentPage);
    }

    // Changes the game object's tags to contain
    // given tag object.
    changeGameObjTags = (tagObj) => {
        let newGameObj = this.props.game;
        newGameObj.tags = tagObj;
        this.props.gameCallback(newGameObj);
    }

    // Adds an empty tag String.
    addTag = () => {
        let newRecentPage = this.props.recentPage;
        let num = newRecentPage.content.box.tagNum; 
        
        newRecentPage.content.box.tags[num] = "";

        newRecentPage.content.box.tagNum = num + 1;

        this.props.recentCallback(newRecentPage);
        this.changeGameObjTags(newRecentPage.content.box.tags);
    }

    // Changes the tag String at given index. 
    changeTag = (index, tag) => {
        let newRecentPage = this.props.recentPage; 
        
        newRecentPage.content.box.tags[index] = tag;

        this.props.recentCallback(newRecentPage);
        this.changeGameObjTags(newRecentPage.content.box.tags);
    }

    // Removes the tag String at given index.
    removeTag = (index) => {
        let newRecentPage = this.props.recentPage;  

        delete newRecentPage.content.box.tags[index];

        this.props.recentCallback(newRecentPage);
        this.changeGameObjTags(newRecentPage.content.box.tags);
    }

    
    // Adds an empty summary paragraph String.
    addSummary = () => {
        let newRecentPage = this.props.recentPage;
        let num = newRecentPage.content.sumNum; 
        
        newRecentPage.content.summary[num] = "";
        newRecentPage.content.sumNum = num + 1;

        this.props.recentCallback(newRecentPage);
    } 

    // Changes the summary paragraph String at given index. 
    changeSummary = (index, text) => {
        let newRecentPage = this.props.recentPage;
        
        newRecentPage.content.summary[index] = text;
       
        this.props.recentCallback(newRecentPage);
    }

    // Removes the summary paragraph String at given index  
    removeSummary = (index) => {
        let newRecentPage = this.props.recentPage;
        
        delete newRecentPage.content.summary[index];

        this.props.recentCallback(newRecentPage);
    }
    
    // Adds an empty subsection object.
    addSubsection = () => {
        let newRecentPage = this.props.recentPage;
        let num = newRecentPage.content.subNum; 
        
        newRecentPage.content.subs[num] = {
            name: "",
            screenshot: {
                link: "",
                alt: "",
                caption: ""
            },
            subtext: {
                0: ""
            },
            textNum: 0
        };   

        newRecentPage.content.subNum = num + 1;

        this.props.recentCallback(newRecentPage);
    } 


    // Changes the subsection object at given index  
    changeSubsection = (index, subObj) => {
        let newRecentPage = this.props.recentPage;
        
        newRecentPage.content.subs[index] = subObj;   

        this.props.recentCallback(newRecentPage);
    }

    // Removes the subsection object at given index  
    removeSubsection = (index) => {
        let newRecentPage = this.props.recentPage;
        
        delete newRecentPage.content.subs[index];   

        this.props.recentCallback(newRecentPage);
    }

    // Adds an empty external link object to external subsection.
    addExternalLink = () => {
        let newRecentPage = this.props.recentPage;
        let num = newRecentPage.content.subs.external.linkNum; 
        
        newRecentPage.content.subs.external[num] = {
            link: "",
            alt: ""
        };  

        newRecentPage.content.subs.external.linkNum = num + 1;

        this.props.recentCallback(newRecentPage);
    }

    // Changes the external link object at given index in external subsection.
    changeExternalLink = (index, link, alt) => {
        let newRecentPage = this.props.recentPage;
        
        newRecentPage.content.subs.external[index] = {
            link: link,
            alt: alt
        };  

        this.props.recentCallback(newRecentPage);
    }

    // Removes the external link object at given index in external subsection.
    removeExternalLink = (index) => {
        let newRecentPage = this.props.recentPage; 
        
        delete newRecentPage.content.subs.external[index]; 

        this.props.recentCallback(newRecentPage);
    }

    render() {
        let callbacks = {
            webLink: this.changeWebLink,
            webAlt: this.changeWebAlt,

            addDev: this.addDeveloper,
            changeDev: this.changeDeveloper,
            removeDev: this.removeDeveloper,

            pubLink: this.changePubLink,
            pubAlt: this.changePubAlt,

            addRel: this.addRelease,
            changeRel: this.changeRelease,
            removeRel: this.removeRelease,

            addPlat: this.addPlatform,
            removePlat: this.removePlatform,

            addClient: this.addClient,
            changeClient: this.changeClient,
            removeClient: this.removeClient,

            addTag: this.addTag,
            changeTag: this.changeTag,
            removeTag: this.removeTag,

            changeSearchImg: this.changeSearchImage,

            addSum: this.addSummary,
            changeSum: this.changeSummary,
            removeSum: this.removeSummary,

            addSub: this.addSubsection,
            changeSub: this.changeSubsection,
            removeSub: this.removeSubsection,

            addExLink: this.addExternalLink,
            changeExLink: this.changeExternalLink,
            removeExLink: this.removeExternalLink
        };

        let pageState = {
            title: this.props.page.title,
            coverLink: this.props.recentPage.content.box.cover.link,
            coverAlt: this.props.recentPage.content.box.cover.alt,
            webLink: this.props.recentPage.content.box.website.link,
            webAlt: this.props.recentPage.content.box.website.alt,
            pubLink: this.props.recentPage.content.box.publisher.link,
            pubAlt: this.props.recentPage.content.box.publisher.alt,
            developers: this.props.recentPage.content.box.developers,
            platforms: this.props.recentPage.content.box.platforms,
            releases: this.props.recentPage.content.box.releases,
            clients: this.props.recentPage.content.box.clients,
            tags: this.props.recentPage.content.box.tags,
            searchImage: this.props.game.cover,
            subs: this.props.recentPage.content.subs
        };

        let summary = this.props.recentPage.content.summary;
        let summaryKeys = Object.keys(summary);
        let summaryComponents = summaryKeys.map((key) => {   
            return (
                <CreateSummary key={key} index={key}
                summaryText={summary[key]}
                changeCallback={this.changeSummary} 
                removeCallback={this.removeSummary}/>
            );
        });

        return (
            <section className="content-page">
                <div className="content-container">
                    <section className="summary">
                        <CreateTitle titleText={this.props.page.title} titleCallback={this.changeTitle}/>
                        <CreatePageBox coverLinkCallback={this.changeCoverLink} 
                        coverAltCallback={this.changeCoverAlt} 
                        callbacks={callbacks}
                        pageState={pageState}/>
                        {summaryComponents}
                        <div className="add" role="button" onClick={() => {this.addSummary()}}>
                            Add Paragraph
                        </div>
                    </section>
                    <CreateSubs callbacks={callbacks} pageState={pageState}/>
                </div>
            </section>
        );
    }
}