chrome.tabs.query({}, function (tabs) {
	for (var i = 0; i < tabs.length; i++) {
		parseTabs(tabs[i].url, tabs[i].id);
	}
});

chrome.tabs.onUpdated.addListener(function (id) {
	chrome.tabs.get(id, function (tabs) {
		if(tabs !== undefined) parseTabs(tabs.url, tabs.id);
	});
});

chrome.tabs.onCreated.addListener(function (tabs) {
	parseTabs(tabs.url, tabs.id);
});

function parseTabs(url, id) {
	if (url.indexOf('google') > -1) return false;
	if (url.indexOf('yahoo') > -1) return false;
	if (url.indexOf('bing') > -1) return false;
	if (url.indexOf('duckduckgo') > -1) return false;

	chrome.storage.sync.get(function (resp) {
		var isMatch = false;
		for (var key in resp) {
			if (resp[key].type === '1') {
				if (url.indexOf(resp[key].website) > -1) {
					if (isMatch === false) chrome.tabs.remove(id);

					isMatch = true;
				}
			}
			if (resp[key].type === '2') {
				if (url === resp[key].website) {
					if (isMatch === false) chrome.tabs.remove(id);

					isMatch = true;
				}
			}
			if (resp[key].type === '3') {
				var re = new RegExp(resp[key].website);
				if (re.test(url)) {
					if (isMatch === false) chrome.tabs.remove(id);

					isMatch = true;
				}
			}
		}
	});
}