/*

INFO 340

AUTHORS:    Hojun Kim (hojunkim@uw.edu)
            Nikolai Frank Nilsen (ez43tl99@uw.edu)

VERSION:    STAGE 2

Contains JS content for adding functionality and
behavior for the SheepBoy web app.

*/

/*
FUNCTIONS:
	initialize <-- Call to start page

	FETCHING:
		fetchGames
		fetchPage

	DOM-MANIPULATION:
		updateResults
		fillResults
		buildGameBox
		addPlatformsToParent
		fillTagOptions
		fillPublisherOptions

		toggleSearchAndContent
	
		addDropdownHandlers
		addSearchButtonHandler
		addDeleteHandlers	
		addContentPageHandlers
		addAlertHandler
		
		emptyContentPage
		fillContentPage
		fillSummaryBox
		fillSummaryText
		fillSubs
		buildScreenshotBox

	FILTER & SORTING:
		filterByState
		filterByFunction
		sortBy
		containsTitleOrPublisher
		containsTag
		containsPublisher
		containsTitle
		containsDeveloper
		containsPlatform
		compareViews
		compareDate
		compareAlphabetical
		getSortedUniqueTags
		getSortedUniquePubs

		getContentPage

	HELPER FUNCTIONS:
		getAlt
*/

'use strict';

// ----------CONSTANTS AND GLOBALS-----------------

const GAMES_URL = "json/games.json";
const PAGES_URL = "json/pages.json";

// Contains information for creating platform icons.
const PLATFORM_ICONS = {
	ios: {
		src: "img/platform/ios.png",
		alt: "ios-mobile"
	},

	android: {
		src: "img/platform/android.png",
		alt: "android-mobile"
	},

	nintendo: {
		src: "img/platform/nintendo-switch.png",
		alt: "nintendo-platforms"
	},

	playstation: {
		src: "img/platform/playstation.png",
		alt: "playstation-platforms"
	},

	xbox: {
		src: "img/platform/xbox-one.png",
		alt: "xbox-platforms"
	},

	windows: {
		src: "img/platform/windows.png",
		alt: "windows-os"
	},

	mac: {
		src: "img/platform/mac.png",
		alt: "mac-os"
	},

	linux: {
		src: "img/platform/linux.png",
		alt: "linux-os"
	}
};

// Stores information on what arguments
// are associated with which strings
// representing how to sort game boxes.
const SORT_FUNCTIONS = {
	"": {
		"function": compareDate,
		"mostToLeast": true
	},
	"recent": {
		"function": compareDate,
		"mostToLeast": true
	},
	"popular": {
		"function": compareViews,
		"mostToLeast": true
	},
	"most viewed": {
		"function": compareViews,
		"mostToLeast": true
	},
	"least viewed": {
		"function": compareViews,
		"mostToLeast": false
	},
	"newest": {
		"function": compareDate,
		"mostToLeast": true
	},
	"oldest": {
		"function": compareDate,
		"mostToLeast": false
	}
}

// This keeps track of the current search inputs.
//
// Note that I deliberately chose to use a global variable
// here, as otherwise it becomes much harder to keep
// track of the user's search inputs.
var currentState = {
	search: "",
	tags: [],
	sort: "newest",
	publisher: "",
	platform: ""
}

//-------------------FUNCTION CALLS-------------------------

initialize();

//--------------------FUNCTIONS-----------------------------

// Call this to run the page.
function initialize() {
	fetchGames(GAMES_URL);
	addDropdownHandlers();
	addSearchButtonHandler();
	addDeleteHandlers();
	addContentPageHandlers();
	addAlertHandler();
}

// Attempts to populate results output with game objects retrieved
// from given url representing a path to a .json file. Will give an error
// alert to user if something goes wrong in the process.
//
// Also attempts to add search drop-down content and functionality.
function fetchGames(url) {
	fetch(url)
		.then(function(response) {
			// Ensure response status is okay.
			if (response.status >= 200 && response.status < 300) {
				return response.json();
			} else {
				return new Error(response.status + ": " + response.statusText);
			}
		})
		.then(function(data) {
			updateResults(data);
			fillTagOptions(getSortedUniqueTags(data.games, compareAlphabetical, false));   
			fillPublisherOptions(getSortedUniquePubs(data.games, compareAlphabetical, false));
		})
		.catch(function() {
			$(".error-alert").removeClass("hidden");
		});
}


// Attempts to switch from search page to content page, and populate
// content page with game information using pages from given url
// representing a path to a .json file. The given String gameTitle
// specifies which page from the file to populate the page with. Will
// show error alert to user if something goes wrong in the process.
function fetchPage(url, gameTitle) {
	fetch(url)
		.then(function(response) {
		// Ensure response status is okay.
		if (response.status >= 200 && response.status < 300) {
				return response.json();
			} else {
				return new Error(response.status + ": " + response.statusText);
			}
		})
		.then(function(data) {
			fillContentPage(getContentPage(data.pages, gameTitle));
			toggleSearchAndContent();
		})
		.catch(function() {
			$(".error-alert").removeClass("hidden");
		});
}



// Call this to update search results output using
// current state.
function updateResults(gamesObj) {
	// Empty current output before filling!
	$(".result").empty();

	fillResults(filterByState(gamesObj.games, currentState));
}

// Takes in an array of objects containing game information,
// and populates the result section with game boxes from
// the given array.
function fillResults(gameArr) {
	let resultsOutput = $(".result");
	gameArr.forEach(function(gameObj) {
		let box = buildGameBox(gameObj);
		resultsOutput.append(box);
	});
}

// Takes in an object containing information about a game, and
// returns a DOM element built using that information.
function buildGameBox(gameObj) {
	let container = $("<div></div>");
	container.addClass("result-container");

	let coverContainer = $("<div><img></div>");
	coverContainer.addClass("result-cover-container");
	coverContainer.find("img").attr({src: gameObj.cover, alt: getAlt(gameObj.title)});
	container.append(coverContainer);

	let title = $("<h2>" + gameObj.title + "</h2>");
	title.addClass("result-game-title");
	container.append(title);

	let developers = $("<h3></h3>");
	developers.addClass("result-developers");

	let devArr = gameObj.developers;
	let devLine = devArr[0];

	// If there are more developers, add them to final string.
	for (let i = 1; i < devArr.length; i++) {
		devLine += ", " + devArr[i];
	}

	developers.text(devLine);
	container.append(developers);

	let platforms = $("<div></div>");
	platforms.addClass("result-platform-container");

	let plArray = gameObj.platforms;
	addPlatformsToParent(plArray, platforms)

	container.append(platforms);

	container.on("click", function() {
		fetchPage(PAGES_URL, gameObj.title);
	});

	container.attr({role: "button", tabindex: 0});

	return container;
}

// Takes in an array of Strings representing platforms of
// a game, and a parent DOM element, and adds <img> elements
// inside parent representing icons for each platform
// in given array.
function addPlatformsToParent(plArray, parent) {
	plArray.forEach(function(item) {
		let icon = $("<img>");
		icon.attr({src: PLATFORM_ICONS[item].src, alt: PLATFORM_ICONS[item].alt});
		parent.append(icon);
	});
}

// Takes in a String array representing tags, and
// adds them to the tag drop-down on the search page.
// Also assigns each one a click event handler that
// lets users click a tag option to include it
// in the search parameters.
function fillTagOptions(tagArr) {
	let parent = $(".tag-dropdown");
	parent.empty();
	tagArr.forEach(function(tag) {
		let tagOption = $("<div></div>");
		tagOption.addClass("tag-option");
		tagOption.addClass("option");
		tagOption.attr({role: "button", tabindex: 0});
		tagOption.text(tag);
		tagOption.on('click', function() {
			let tagText = $(this).text();
			if (!currentState.tags.includes(tagText)) {
				currentState.tags.push(tagText);
				fetchGames(GAMES_URL);
				let tagBox = $('<div class="tag" role="button" tabindex="0"></div>');
				tagBox.append('<p>' + tagText + '</p>');
				tagBox.append('<button class="tag-button hidden"><i aria-label="times" class="fa fa-times-circle" aria-hidden="true"></i></button>');
				// Removes tag if 'x' button is clicked by user.
				tagBox.on('click', function() {
					let tagText = $(this).find('p').text();
					$(this).remove();
					let index = currentState.tags.indexOf(tagText);
					currentState.tags.splice(index, 1);
					fetchGames(GAMES_URL);
				});
				$(".tag-container").append(tagBox);
			}
		});
		parent.append(tagOption);
	});
}

// Takes in a String array representing publishers,
// and adds them to the publisher drop-down on
// the search page.
function fillPublisherOptions(pubArr) {
	let parent = $(".pub-dropdown");
	parent.empty();
	pubArr.forEach(function(pub) {
		let pubOption = $("<div></div>");
		pubOption.addClass("option");
		pubOption.text(pub);
		pubOption.attr("role", "button");
		pubOption.on("click", function() {
			let text = $(this).text();
			currentState.publisher = text.toLowerCase();
			$('.publisher').find('p').text(' by ' + text);
			$(".publisher").removeClass("hidden");
			fetchGames(GAMES_URL);
		});
		parent.append(pubOption);
	});
}

// Changes pages between the search page,
// and the content page.
function toggleSearchAndContent() {
	$(".search-container").toggleClass("hidden");
	$(".filter-container").toggleClass("hidden");
	$(".applied-container").toggleClass("hidden");
	$(".tag-container").toggleClass("hidden");
	$(".page-nav").toggleClass("hidden");
	$(".result").toggleClass("hidden");
	$(".content-page").toggleClass("hidden");
}

// Adds handlers to sort and platform dropdowns to enable selecting
// options from them. Also allows users to close by clicking outside
// dropdown.
function addDropdownHandlers() {
	// Toggles the drop-down list of choices once clicked on.
	$(".dropdown").on("click", function() {
		$(".dropdown").find(".dropdown-content").removeClass("show");
		$(this).find(".dropdown-content").toggleClass("show");
	});

	// Updates the currentState when a user clicks on a filter option from the available drop-downs
	// and reveals filter choice in applied-filter container
	$(".sort-dropdown").find(".option").on("click", function() {
		let text = $(this).text();
		currentState.sort = text.toLowerCase();
		$('.sort').find('p').text(text);
		$(".sort").removeClass("hidden");
		fetchGames(GAMES_URL);
	});

	$(".platform-dropdown").find(".option").on("click", function() {
		let text = $(this).text();
		currentState.platform = text.toLowerCase();
		$('.platform').find('p').text(' on ' + text);
		$(".platform").removeClass("hidden");
		fetchGames(GAMES_URL);
	});

	// Hides the drop-down list once user clicks anywhere else on the page.
	$(window).on("click", function(event) {
		let test = $(".dropdown").has(event.target).length > 0;
		if (!test) {
			$(".dropdown-content").removeClass("show");
		}
	});


}

// Updates the currentState's search portion with the user's input
// and adds search input to applied-filters container
function addSearchButtonHandler() {
	$(".search-button").on("click", function() {
	let sInput = $('.search-input');
	let sText = sInput.val();

	if (sText !== "" || currentState.search !== "") {
		sInput.val("");
		currentState.search = sText;
		fetchGames(GAMES_URL);
	}

	$('.search').find('p').text(" containing '" + sText + "'");

	if (sText === "") {
		$('.search').addClass("hidden");
	} else {		
		$('.search').removeClass("hidden");
	}
});
}

// Adds delete functionality to search input feedbacks to
// allow users to remove search inputs.
function addDeleteHandlers() {
	// Removes filters from currentState and applied-filters container
	$('.applied-label:not(.prefix):not(.game)').on('click', function() {
		$(this).addClass("hidden");
		let text = $(this).find('p').text().toLowerCase();
		if (text.indexOf(' on ') >= 0) {
			currentState.platform = '';
		} else if (text.indexOf(' by ') >= 0) {
			currentState.publisher = '';
		} else if (text.indexOf('containing') >= 0) {
			currentState.search = '';
		} else {
			currentState.sort = '';
		}
		fetchGames(GAMES_URL);
	});
}

// Adds handlers to content page subsection buttons
// to allow users to view or hide subsections. Also
// adds back button functionality.
function addContentPageHandlers() {
	// Toggles showing/hiding content sub sections.
	$(".content-sub-container").on("click", function() {
		$(this).find(".content-sub-section").toggleClass("hidden");
		$(this).find(".content-icon-container i").toggleClass("fa-chevron-down");
		$(this).find(".content-icon-container i").toggleClass("fa-chevron-up");
	});

	// Allows users to go from content page to search page.
	$(".back-button").on("click", toggleSearchAndContent);
}

// Adds handler to error message allowing
// users to dismiss it.
function addAlertHandler() {
	$(".error-alert i").on("click", function() {
		$(".error-alert").addClass("hidden");
	});
}

// Removes all game information content
// from the content page.
function emptyContentPage() {
	$(".content").empty();
	$(".summary-text").remove();
}

// Takes in an object containing content page information,
// and fills in the content page with it after emptying
// what is currently on the content page.
// 
// If given argument is undefined only empties current contents.
function fillContentPage(pageObj) {
	// Empty current contents first.
	emptyContentPage();

	if (pageObj) {
		$(".game-title").text(pageObj.title);
		fillSummaryBox(pageObj.box);
		fillSummaryText(pageObj.summary);
		fillSubs(pageObj.subs);
	}
}

// Takes in an object containing information of the summary box
// of a content page, and fills in the summary box with content
// based on given argument.
//
// This function assumes that the summary box is empty.
function fillSummaryBox(boxObj) {

	// Add cover art
	let coverImg = $("<img>");
	coverImg.attr({src: boxObj.cover.link, alt: boxObj.cover.alt});
	$(".cover-container").append(coverImg);

	// Add official website
	let webLink = $("<a></a>");
	webLink.attr("href", boxObj.website.link);
	webLink.text(boxObj.website.alt);
	$(".web-row td").append(webLink);

	// Add developers
	let devData = $(".dev-row td")
	boxObj.developers.forEach(function(dev) {
		let devLink = $("<a></a>");
		devLink.attr("href", dev.link);
		devLink.text(dev.alt);
		devData.append(devLink);
	});

	// Add publisher
	let pubLink = $("<a></a>");
	pubLink.attr("href", boxObj.publisher.link);
	pubLink.text(boxObj.publisher.alt);
	$(".pub-row td").append(pubLink);

	// Add platforms
	addPlatformsToParent(boxObj.platforms, $(".plat-row td"));

	// Add release dates
	boxObj.releases.forEach(function(date) {
		let relDate = $("<span></span>");
		relDate.text(date.client + ": " + date.date);
		$(".rel-row td").append(relDate);
	});

	// Add available on links
	boxObj.available.forEach(function(link) {
		let availLink = $("<a></a>");
		availLink.attr("href", link.link);
		availLink.text(link.alt);
		$(".avail-row td").append(availLink);
	});

	// Add tags
	let tagContainer = $("<span></span>");
	let tags = boxObj.tags;
	tagContainer.text(tags[0]);
	for (let i = 1; i < tags.length; i++) {
		// Ensures proper comma formatting.
		tagContainer.text(tagContainer.text() + ", " + tags[i]);
	}
	$(".tag-row td").append(tagContainer);
}

// Takes in an array of Strings representing summary
// text paragraphs, and adds the to the content page.
function fillSummaryText(textArr) {
	let summarySection = $(".summary");
	textArr.forEach(function(text) {
		let textBlock = $("<p></p>");
		textBlock.addClass("summary-text");
		textBlock.text(text);
		summarySection.append(textBlock);
	});
}

// Takes in an object containing content page subsection information
// and fills the content page with that information.
function fillSubs(subsObj) {

	// Add content to gameplay subsection
	let gameplay = $(".gameplay-sub");
	// Check if gameplay subsection has a screenshot.
	if (subsObj.gameplay.hasOwnProperty("screenshot")) {
		gameplay.append(buildScreenshotBox(subsObj.gameplay.screenshot));
	}
	subsObj.gameplay.subtext.forEach(function(text) {
		let textBlock = $("<p></p>");
		textBlock.addClass("content-sub-text");
		textBlock.text(text);
		gameplay.append(textBlock);
	});


	// Add content to plot subsection
	let plot = $(".plot-sub");
	// Check if gameplay subsection has a screenshot.
	if (subsObj.plot.hasOwnProperty("screenshot")) {
		plot.append(buildScreenshotBox(subsObj.plot.screenshot));
	}
	subsObj.plot.subtext.forEach(function(text) {
		let textBlock = $("<p></p>");
		textBlock.addClass("content-sub-text");
		textBlock.text(text);
		plot.append(textBlock);
	});


	// Add content to developement subsection
	let developement = $(".developement-sub");
	// Check if gameplay subsection has a screenshot.
	if (subsObj.developement.hasOwnProperty("screenshot")) {
		developement.append(buildScreenshotBox(subsObj.developement.screenshot));
	}
	subsObj.developement.subtext.forEach(function(text) {
		let textBlock = $("<p></p>");
		textBlock.addClass("content-sub-text");
		textBlock.text(text);
		developement.append(textBlock);
	});

	// Add content to external links subsection
	let external = $(".external-sub");
	subsObj.external.links.forEach(function(link) {
		let exLink = $("<a></a>");
		exLink.addClass("content-sub-text");
		exLink.attr("href", link.link)
		exLink.text(link.alt);
		external.append(exLink);
	});
}

// Takes in an object storing information about a screenshot,
// and returns a div containing that information.
function buildScreenshotBox(screenObj) {
	let container = $("<div></div>");
	container.addClass("screenshot-container");

	// Add screenshot image.
	let screenshotImg = $("<img>");
	screenshotImg.attr({src: screenObj.link, alt: screenObj.alt});
	container.append(screenshotImg);

	// Add screenshot caption.
	let captionText = $("<p></p>");
	captionText.addClass("screenshot-caption");
	captionText.text(screenObj.caption);
	container.append(captionText);

	return container;
}

// Takes in an array of objects containing game information, and
// an object containing all search queries stored by the current
// page, and returns an array of objects filtered and sorted
// by the values within given object "state".
function filterByState(gameArr, state) {
	let result = gameArr;

	if (state.search != "") {
		result = filterByFunction(gameArr, containsTitleOrDeveloper, state.search);
	}

	if (state.tags.length > 0) {
		state.tags.forEach(function(tag) {
			result = filterByFunction(result, containsTag, tag);
		});
	}

	if (state.publisher != "") {
		result = filterByFunction(result, containsPublisher, state.publisher);
	}

	if (state.platform != "") {
		result = filterByFunction(result, containsPlatform, state.platform);
	}

	if (state.sort != "") {
		result = sortBy(result, SORT_FUNCTIONS[state.sort.toLowerCase()].function, SORT_FUNCTIONS[state.sort.toLowerCase()].mostToLeast)
	}

	return result;
}

// Takes in an array of objects containing game information, and
// returns an array of objects filtered by given filterFunction
// and filterInput.
//
// filterFunction is a function that must take in one object
// argument, and one other input, and return true of given object
// meets critera as determined by the input (i.e. input is a tag,
// function returns true if given object contains given tag.).
// Otherwise it must return false.
//
// filterInput is an argument that is used by the filterFunction
// to filter through objects in the given gameArr.
function filterByFunction(gameArr, filterFunction, filterInput) {
	let result = [];
	gameArr.forEach(function(gameObj) {
		if (filterFunction(gameObj, filterInput)) {
			result.push(gameObj);
		}
	});
	return result;
}

// Takes in an array of elements, and returns an array that
// represents the input array but sorted.
//
// compareFunction is a function that must take in two arguments
// of the same type as the elements in the given array, and it
// must return true if argument1 > argument2, otherwise it must
// return false.
//
// mostToLeast is a boolean that, when true, means the returned
// array is sorted from greatest to least values. When false,
// returned array is sorted from least to greatest.
function sortBy(inputArr, compareFunction, mostToLeast) {
	// Base Case: Just return single element array.
	if (inputArr.length <= 1) {
		return inputArr;

	// Recursive Case: Get left & right, then sort. (yayy merge sort!)
	} else {
		let left = sortBy(inputArr.slice(0, Math.floor(inputArr.length / 2)), compareFunction, mostToLeast);
		let right = sortBy(inputArr.slice(Math.floor(inputArr.length / 2), inputArr.length), compareFunction, mostToLeast);
		let leftIndex = 0;
		let rightIndex = 0;
		let result = [];

		// Elements aren't sorted until both lists are exhausted.
		while (leftIndex < left.length || rightIndex < right.length) {
			// Ran out of elements in left array, so dump in right array leftovers.
			if (leftIndex >= left.length) {
				result = result.concat(right.slice(rightIndex, right.length));
				rightIndex = right.length;
			// Ran out of elements in right array, so dump in left array leftovers.
			} else if (rightIndex >= right.length) {
				result = result.concat(left.slice(leftIndex, left.length));
				leftIndex = left.length;
			} else {
				let leftItem = left[leftIndex];
				let rightItem = right[rightIndex];

				// Sorting from greatest to least.
				if (mostToLeast) {
					if (compareFunction(leftItem, rightItem)) {
						result.push(leftItem);
						leftIndex++;
					} else {
						result.push(rightItem);
						rightIndex++;
					}

				// Sorting from least to greatest.
				} else {
					if (compareFunction(leftItem, rightItem)) {
						result.push(rightItem);
						rightIndex++;
					} else {
						result.push(leftItem);
						leftIndex++;
					}
				}
			}
		}
		// Outside loop, done sorting.
		return result;
	}
}

// Returns true if given object containing game
// information contains given String searchInput
// as a substring of either the game's title
// or developer(s), ignoring case. Returns
// false otherwise.
function containsTitleOrDeveloper(gameObj, searchInput) {
	return (containsTitle(gameObj, searchInput) || containsDeveloper(gameObj, searchInput));
}


// Returns true if given object containing game
// information contains given String tag,
// NOT ignoring casing. Otherwise returns false.
function containsTag(gameObj, tag) {
	return gameObj.tags.includes(tag);
}


// Returns true if given object containing game
// information has the given String publisher,
// NOT ignoring casing. Otherwise returns false.
function containsPublisher(gameObj, publisher) {
	return gameObj.publisher.toLowerCase() === publisher.toLowerCase();
}


// Returns true if given object containing game
// information contains given String title, which
// represents a possible substring of the game's title,
// ignoring casing. Otherwise returns false.
function containsTitle(gameObj, title) {
	return (gameObj.title).toLowerCase().includes(title.toLowerCase());
}


// Returns true if given object containing game
// information contains given String developer,
// which represents a possible substring of the game's
// developer, ignoring casing. Otherwise returns false.
function containsDeveloper(gameObj, developer) {
	let isFound = false;
	gameObj.developers.forEach(function(dev) {
		if (dev.toLowerCase().includes(developer.toLowerCase())) {
			isFound = true;
		}
	});
	return isFound;
}


// Returns true if given object containing
// game information contains given String
// platform, NOT ignoring casing. Otherwise
// returns false.
function containsPlatform(gameObj, platform) {
	return gameObj.platforms.includes(platform);
}


// Takes in two objects containing game information, and returns
// true if gameOne has moreviews than gameTwo. Otherwise returns false.
function compareViews(gameObjOne, gameObjTwo) {
	return gameObjOne.views > gameObjTwo.views;
}


// Takes in two objects containing game information, and returns
// true if gameOne has a more recent date than gameTwo. Otherwise
// returns false.
function compareDate(gameObjOne, gameObjTwo) {
	let dateOne = new Date(gameObjOne.created);
	let dateTwo = new Date(gameObjTwo.created);
	return dateOne.getTime() > dateTwo.getTime();
}

// Takes in two strings, and returns true if the first
// string comes first in alphabetical order compared to the
// second string, case-insensitively. Otherwise returns false.
function compareAlphabetical(stringOne, stringTwo) {
	return stringOne.toLowerCase() > stringTwo.toLowerCase();
}


// Takes in an array of objects representing games, and returns
// a String array of unique tags from each game object in sorted order.
//
// compareFunction is a function that must take in two arguments
// of type String, and it must return true if argument1 > argument2, 
// otherwise it must return false.
//
// mostToLeast is a boolean that, when true, means the returned
// array is sorted from greatest to least values. When false,
// returned array is sorted from least to greatest.
function getSortedUniqueTags(gamesArr, compareFunction, mostToLeast) {
	let result = [];
	gamesArr.forEach(function(game) {
		game["tags"].forEach(function(tag) {
			if (!result.includes(tag)) {
				result.push(tag);
			}
		});
	});
	return sortBy(result, compareFunction, mostToLeast);
}

// Takes in an array of objects representing games, and returns
// a String array of unique publishers from each game object in sorted order.
//
// compareFunction is a function that must take in two arguments
// of type String, and it must return true if argument1 > argument2, 
// otherwise it must return false.
//
// mostToLeast is a boolean that, when true, means the returned
// array is sorted from greatest to least values. When false,
// returned array is sorted from least to greatest.
function getSortedUniquePubs(gamesArr, compareFunction, mostToLeast) {
	let result = [];
	gamesArr.forEach(function(game) {	
		let pub = game.publisher;
		if (!result.includes(pub)) {
			result.push(pub);
		}
	});
	return sortBy(result, compareFunction, mostToLeast);
}


// Given an array of objects representing game info pages, and a
// String game title, returns the page object pertaining to that game.
//
// Returns null if content page associated with given
// game title is not found.
function getContentPage(pageArr, gameTitle) {
	let result = null;
	pageArr.forEach(function(page) {
		if (page.title === gameTitle) {
			result = page;
		}
	})
	return result;
}

// Takes in a game title, and returns a string representing
// alt text for an img tag using that game title.
function getAlt(title) {
	// Lower case, replace spaces with "-", add "-cover-art" to end.
	return title.toLowerCase().replace(/\s/g, "-") + "-cover-art";
}