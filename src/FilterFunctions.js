// DEFAULT: filterByState
// EXPORTS: PLATFORM_ICONS, getContentPage, getAlt
//
//

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

// Takes in an array of objects containing game information, and
// an object containing all search queries stored by the current
// page, and returns an array of objects filtered and sorted
// by the values within given object "state".
export function filterByState(gameArr, searchState) {
	let result = gameArr;

	if (searchState.search !== "") {
		result = filterByFunction(gameArr, containsTitleOrDeveloper, searchState.search);
	}

	if (searchState.tags.length > 0) {
		searchState.tags.forEach(function(tag) {
			result = filterByFunction(result, containsTag, tag);
		});
	}

	if (searchState.publisher !== "") {
		result = filterByFunction(result, containsPublisher, searchState.publisher);
	}

	if (searchState.platform !== "") {
		result = filterByFunction(result, containsPlatform, searchState.platform.toLowerCase());
	}

	if (searchState.sort !== "") {
		result = sortBy(result, SORT_FUNCTIONS[searchState.sort.toLowerCase()].function, SORT_FUNCTIONS[searchState.sort.toLowerCase()].mostToLeast)
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
export function sortBy(inputArr, compareFunction, mostToLeast) {
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

// Takes in two objects containing page information, and returns
// true if pageOne has a more recent date than pageTwo. Otherwise
// returns false.
export function comparePageDate(pageObjOne, pageObjTwo) {
	let dateOne = new Date(pageObjOne.created);
	let dateTwo = new Date(pageObjTwo.created);
	return dateOne.getTime() > dateTwo.getTime();
}

// Takes in two strings, and returns true if the first
// string comes first in alphabetical order compared to the
// second string, case-insensitively. Otherwise returns false.
export function compareAlphabetical(stringOne, stringTwo) {
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
export function getSortedUniqueTags(gamesArr, compareFunction, mostToLeast) {
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
export function getSortedUniquePubs(gamesArr, compareFunction, mostToLeast) {
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
export function getContentPage(pageArr, gameTitle) {
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
export function getAlt(title) {
	if (title.length < 1) {
		return "";
	} else {
		// Lower case, replace spaces with "-", add "-cover-art" to end.
		return title.toLowerCase().replace(/\s/g, "-") + "-cover-art";
	}
}