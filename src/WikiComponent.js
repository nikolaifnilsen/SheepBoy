import React, { Component } from 'react';
import PageSection from './PageSection';
import CreatePage from './create-components/CreatePage';

export default class WikiComponent extends Component {

    render() {

        if (this.props.showRead) {
            return (
                <PageSection title={this.props.page.title} page={this.props.recentPage.content}/>
            );

        } else if (this.props.showEdit) {
            return (
                <CreatePage page={this.props.page} recentPage={this.props.recentPage}
                game={this.props.game} pageCallback={this.props.pageCallback}
                recentCallback={this.props.recentCallback}
                gameCallback={this.props.gameCallback}/>
            );

        } else {
            return (
                <div className="hidden"></div>
            );
        }   
    }
}