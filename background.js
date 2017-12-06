var holoMode = false
chrome.browserAction.onClicked.addListener(function (tab) {
	holoMode = !holoMode

	if (!holoMode) {
		chrome.tabs.executeScript(tab.ib, {
			file: 'reject.js'
		});
	}
	else {
		chrome.tabs.executeScript(tab.ib, {
			file: 'inject.js'
		});
	}
});