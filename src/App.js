import 'whatwg-fetch';
import React, { Component } from 'react';
import {filterByState, getSortedUniqueTags, getSortedUniquePubs, compareAlphabetical, comparePageDate, sortBy, getContentPage} from './FilterFunctions';
import BannerNav from './BannerNav';
import SearchNav from './SearchNav';
import FilterNav from './FilterNav';
import AppliedNav from './AppliedNav';
import TagNav from './TagNav';
import PageNav from './PageNav';
import ResultSection from './ResultSection';
import WikiComponent from './WikiComponent';
import NotFoundPage from './NotFoundPage';
import CreateSuccess from './CreateSuccess';
import Attributions from './Attributions';
import GameboyInputs from './GameboyInputs';
import AlertBox from './AlertBox';
import AuthMenu from './AuthMenu';
import UserMenu from './UserMenu';

import {BLANK_PAGE, BLANK_GAME} from './ObjectTemplates';

import firebase from 'firebase/app';

// Stores Firebase URL routes to appropriate places for data retrieval.
const GAMES_URL = "gamesRoot/games";
const PAGES_URL = "pagesRoot/pages";

// Contains the actual app content for rendering.
class App extends Component {
    constructor(props) {
        super(props);

        // Keeps track of search queries.
        let initialSearchState = {
            search: this.props.search,
            tags: this.props.tags,
            sort: this.props.sort,
            publisher: this.props.publisher,
            platform: this.props.platform,
        }

        this.state = {
            searchState: initialSearchState,

            games: [],
            pages: [],

            pageObj: null,
            mostRecentPage: null,
            gameObj: null,

            gamesRef: firebase.database().ref(GAMES_URL),
            pagesRef: firebase.database().ref(PAGES_URL),

            showSearch: true,
            showRead: false,
            showEdit: false,
            showCreated: false,

            displayAuthMenu: false,
            displayUserMenu: false,  

            currentUser: null,

            errorText: null
        };
    }

    // Attempts to retrieve and load in the games and pages from
    // JSON files once App component is rendered. Will show error
    // box on screen if any loading is unsuccessful.
    componentDidMount() {
        this.state.gamesRef.on('value', (snapshot) => {
            let gamesObj = snapshot.val();
            let gamesKeys = Object.keys(gamesObj);
            let gamesArray = gamesKeys.map((key) => {
                let game = gamesObj[key];
                game.id = key;
                return game;
            });

            this.setState({games: gamesArray});
        });

        this.state.pagesRef.on('value', (snapshot) => {
            let pagesObj = snapshot.val();
            let pageKeys = Object.keys(pagesObj);
            let pageArray = pageKeys.map((key) => {
                let pObj = pagesObj[key];
                pObj.id = key;
                return pObj;
            });

            this.setState({pages: pageArray});
        });

        this.unRegFunc = firebase.auth().onAuthStateChanged((currentUser) => {
            if (currentUser) {
                this.setState({
                    currentUser: currentUser
                });
            } else {
                this.setState({
                    currentUser: null
                });
            }
        });
    }

    // Unregisters firebase event listeners when app is closed.
    componentWillUnmount() {
        this.unRegFunc();
        let gamesRef = firebase.database().ref("gamesRoot/games");
        let pagesRef = firebase.database().ref("pagesRoot/pages");
        gamesRef.off();
        pagesRef.off();
    }

    // If the gameObj in state already exists, update it with the one stored in
    // state. Otherwise, create a new one within database.
    pushGameObj = () => {
        let gamesRef = this.state.gamesRef;
        let gameId = this.state.gameObj.id;
        let newGameObj = JSON.parse(JSON.stringify(this.state.gameObj));
        delete newGameObj.id;
        let currentGameRef = gamesRef.child(gameId);
        currentGameRef.once('value')
            .then(function(snapshot) {
                // If the game obj exists, update it.
                if (snapshot.exists()) {
                    let updates = {};
                    updates[gameId] = newGameObj;
                    gamesRef.update(updates);
                // Otherwise, create it.
                } else {
                    let date = new Date(Date.now());
                    newGameObj.created = date.toString();
                    gamesRef.push(newGameObj);
                }
            })
    }

    // If the pageObj stored in state already exists, update it with recentPageObj info stored in
    // state. Otherwise, create a new page within database using them.
    pushPageObj = () => {
        let pagesRef = this.state.pagesRef;
        let pageId = this.state.pageObj.id;
        let pageTitle = this.state.pageObj.title;
        let pageContent = this.state.mostRecentPage.content;
        let creator = this.state.currentUser.displayName;
        let currentPageRef = pagesRef.child(pageId);
        currentPageRef.once('value')
            .then(function(snapshot) {
                let date = new Date(Date.now());

                // If the page exists, update it.
                if (snapshot.exists()) {
                    let historyObj = {
                        created: date.toString(),
                        user: creator,
                        comment: "Edit",
                        content: pageContent
                    }    
                    currentPageRef.child("history").push(historyObj);

                // Otherwise, create it.
                } else {
                    let historyObj = {
                        created: date.toString(),
                        user: creator,
                        comment: "Created Page",
                        content: pageContent
                    }
                    let pageObj = {
                        title: pageTitle,
                        history: {
                            0: historyObj
                        }
                    }

                    pagesRef.push(pageObj);
                }
            })
    }

    // Updates the Firebase database with given arguments signifying
    // that a new game has been added. If certain fields are not
    // filled in, instead shows an error indicating what is missing.
    updateDatabase = () => {
        let errorString = "";

        let contentObj = this.state.mostRecentPage.content;

        if (contentObj.box.cover.link === "") {
            errorString += "MISSING: Cover Link\n";
        }

        if (contentObj.box.cover.alt === "") {
            errorString += "MISSING: Cover Alt Text\n";
        }

        if (Object.keys(contentObj.box.developers).length === 0) {
            errorString += "MISSING: Need at least one Developer\n";
        }

        if (contentObj.box.publisher.link === "") {
            errorString += "MISSING: Publisher Link\n";
        }

        if (contentObj.box.publisher.alt === "") {
            errorString += "MISSING: Publisher Name\n";
        }

        if (Object.keys(contentObj.box.platforms).length === 0) {
            errorString += "MISSING: Need at least one Platform\n";
        }

        if (Object.keys(contentObj.box.releases).length === 0) {
            errorString += "MISSING: Need at least one Release Date\n";
        }

        if (Object.keys(contentObj.box.clients).length === 0) {
            errorString += "MISSING: Need at least one Client\n";
        }

        if (Object.keys(contentObj.box.tags).length === 0) {
            errorString += "MISSING: Need at least one Tag\n";
        }

        if (this.state.gameObj.cover === "") {
            errorString += "MISSING: Search Image Link\n";
        }

        // If a required field is not filled out, show an error.
        if (errorString !== "") {
            this.showError(errorString);

        // Otherwise, update Firebase.
        } else {
            this.pushGameObj();
            this.pushPageObj();
        }
    }

    //A callback function for registering new users
    handleSignUp = (email, password, username) => {

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredentials) => {
                let user = userCredentials.user; //access the newly created user
                let updatePromise = user.updateProfile({
                    displayName: username
                });
                return updatePromise;
            }).catch((error) => { //report any errors
                this.setState({ errorText: error.message });
            });
    }

    //A callback function for logging in existing users
    handleSignIn = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch((error) => {
                this.setState({ errorText: error.message });
            });
    }

    //A callback function for logging out the current user
    handleSignOut = () => {
        firebase.auth().signOut();
    }

    // Changes search bar query to given String searchText.
    changeSearch = (searchText) => {
        this.setState((currentState) => {
            currentState.searchState.search = searchText;
            return currentState;
        });
    }

    // Adds tag represented by given String tagText to search queries.
    addTag = (tagText) => {
        this.setState((currentState) => {
            if (!currentState.searchState.tags.includes(tagText)) {
                currentState.searchState.tags.push(tagText);
            }
            return currentState;
        });
    }

    // Removes tag represented by given String tagText to search queries.
    removeTag = (tagText) => {
        this.setState((currentState) => {
            let index = currentState.searchState.tags.indexOf(tagText);
            currentState.searchState.tags.splice(index, 1);
            return currentState;
        })
    }

    // Changes sort search query to given String sortText.
    changeSort = (sortText) => {
        this.setState((currentState) => {
            currentState.searchState.sort = sortText;
            return currentState;
        });
    }

    // Changes publisher search query to given String pubText.
    changePublisher = (pubText) => {
        this.setState((currentState) => {
            currentState.searchState.publisher = pubText;
            return currentState;
        });
    }

    // Changes platform search query to given String platText.
    changePlatform = (platText) => {
        this.setState((currentState) => {
            currentState.searchState.platform = platText;
            return currentState;
        });
    }

    // Changes which game wiki page to display to the one
    // represented by given String pageTitle.
    changePage = (pageTitle) => {
        this.setState((currentState) => {
            let pagesCopy = JSON.parse(JSON.stringify(this.state.pages));
            let currentPageObj = getContentPage(pagesCopy, pageTitle);
            currentState.pageObj = currentPageObj;
            if (currentPageObj !== null) {
                let historyKeys = Object.keys(this.state.pageObj.history);
                let tempHistory = historyKeys.map((key) => {
                    let hObj = this.state.pageObj.history[key];
                    hObj.id = key;
                    return hObj;
                }); 

                let pageHistory = sortBy(tempHistory, comparePageDate, true);
                let mostRecentPage = pageHistory[0];
                
                currentState.mostRecentPage = mostRecentPage;
            }
            return currentState;
        });
    }

    resetObjects = () => {
        this.setState({pageObj: null, mostRecentPage: null, gameObj: null});
    }

    changePageObj = (pageObj) => {
        this.setState({pageObj: pageObj});
    }

    changeRecentPageObj = (recentPageObj) => {
        this.setState({mostRecentPage: recentPageObj});
    }

    changeGameObj = (gameObj) => {
        this.setState({gameObj: gameObj});
    }

    showSearchPage = () => {
        this.setState({showSearch: true, showRead: false, showEdit: false, showCreated: false});
    }

    // Toggles the current game page's read page on, and
    // its edit page off if it is being displayed.
    showReadPage = () => {
        this.setState({showSearch: false, showRead: true, showEdit: false, showCreated: false});
    }

    // Toggles the current game page's edit page on, and
    // its read page off if it is being displayed.
    showEditPage = () => {
        this.setState({showSearch: false, showRead: false, showEdit: true, showCreated: false});
    }

    showCreatedPage = () => {
        this.setState({showSearch: false, showRead: false, showEdit: false, showCreated: true});
    }

    // Sets the pageObj to be a blank template. Call this when you
    // want to create a new wiki page!
    createBlankPage = () => {
        this.setState({pageObj: BLANK_PAGE, mostRecentPage: BLANK_PAGE.history[0], 
            gameObj: BLANK_GAME, showSearch: false, showRead: false, showEdit: true});
    }

    // Hides the alert box.
    hideError = () => {
        this.setState({ errorText: null });
    }

    showError = (text) => {
        this.setState({ errorText: text })
    }

    showAuthMenu = () => {
        this.setState({ displayAuthMenu: true });
    }

    hideAuthMenu = () => {
        this.setState({ displayAuthMenu: false });
    }

    showUserMenu = () => {
        this.setState({ displayUserMenu: true });
    }

    hideUserMenu = () => {
        this.setState({ displayUserMenu: false });
    }

    render() {
        // Uses search queries to store list of valid games.
        let currentGames = filterByState(this.state.games, this.state.searchState);

        // If no page is not currently requested, show nothing.
        let pageResult = <div className="hidden"></div>
        let hidePageNav = this.state.showSearch;

        if (this.state.showCreated) {
            pageResult = <CreateSuccess readCallback={this.showReadPage} searchCallback={this.showSearchPage}
            resetCallback={this.resetObjects}/>
            hidePageNav = true;

        } else if (this.state.pageObj !== null) {
            // Only display game wiki page if valid page is found.
            pageResult = <WikiComponent page={this.state.pageObj} 
            recentPage={this.state.mostRecentPage}
            game={this.state.gameObj} showRead={this.state.showRead}
            showEdit={this.state.showEdit} gameCallback={this.changeGameObj}
            recentCallback={this.changeRecentPageObj}
            pageCallback={this.changePageObj}/>

        // User requests a page of a game that doesn't exist, but has search entry.
        } else if (this.state.gameObj !== null) {
            hidePageNav = true;

            pageResult = <NotFoundPage searchCallback={this.showSearchPage} editCallback={this.showEditPage}
            pageCallback={this.changePageObj} recentCallback={this.changeRecentPageObj}
            resetCallback={this.resetObjects} errorCallback={this.showError}/>
        }

        // Tag and Publisher options for dropdown menus.
        let uniqueTags = getSortedUniqueTags(this.state.games, compareAlphabetical, false);
        let uniquePubs = getSortedUniquePubs(this.state.games, compareAlphabetical, false);

        // Contains callbacks for changing App state's search queries.
        let filterCallbacks = {
            addTagCallback: this.addTag,
            removeTagCallback: this.removeTag,
            searchCallback: this.changeSearch,
            sortCallback: this.changeSort,
            publisherCallback: this.changePublisher,
            platformCallback: this.changePlatform
        }

        // Sort and Platform options for dropdown menus.
        let sorts = ["Newest", "Most Viewed", "Oldest", "Least Viewed"];
        let platforms = ["Windows", "Mac", "Linux", "Nintendo", "Playstation", "Xbox", "Android", "iOS"];

        return (
            <div>
                <header>
                    <BannerNav showAuthCallback={this.showAuthMenu} showUserCallback={this.showUserMenu} 
                    user={this.state.currentUser} />
                </header>
                <SearchNav hide={!this.state.showSearch} searchCallback={this.changeSearch}/>
                <FilterNav hide={!this.state.showSearch} filterCallbacks={filterCallbacks} tags={uniqueTags} 
                sorts={sorts} publishers={uniquePubs} platforms={platforms}/>
                <AppliedNav hide={!this.state.showSearch} searchState={this.state.searchState} filterCallbacks={filterCallbacks}/>
                <TagNav hide={!this.state.showSearch} tags={this.state.searchState.tags} removeTagCallback={this.removeTag}/>
                <PageNav hide={hidePageNav} showRead={this.state.showRead} showEdit={this.state.showEdit}
                searchCallback={this.showSearchPage} readCallback={this.showReadPage} 
                editCallback={this.showEditPage} errorCallback={this.showError} resetCallback={this.resetObjects} 
                updateCallback={this.updateDatabase} createdCallback={this.showCreatedPage} user={this.state.currentUser}/>
                <main>
                    <ResultSection hide={!this.state.showSearch} games={currentGames} 
                    showCallback={this.showReadPage} pageCallback={this.changePage}
                    gameCallback={this.changeGameObj} gamesRef={this.state.gamesRef}/>
                    {pageResult}
                </main>
                <footer>
                    <Attributions />
                </footer>
                <GameboyInputs />
                <AlertBox errorText={this.state.errorText} hideCallback={this.hideError}/>
                <AuthMenu isHidden={!this.state.displayAuthMenu} hideCallback={this.hideAuthMenu}
                    signInCallback={this.handleSignIn} signUpCallback={this.handleSignUp}
                    errorCallback={this.showError} />
                <UserMenu isHidden={!this.state.displayUserMenu} hideCallback={this.hideUserMenu}
                user={this.state.currentUser} signOutCallback={this.handleSignOut}
                searchCallback={this.showSearchPage} createCallback={this.createBlankPage}/>
            </div>
        );
    }
}

export default App;