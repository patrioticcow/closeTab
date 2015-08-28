chrome.tabs.query({}, function (tabs) {
	for (var i = 0; i < tabs.length; i++) {
		parseTabs(tabs[i].url, tabs[i].id);
	}
});

chrome.tabs.onCreated.addListener(function (tabs) {
	parseTabs(tabs.url, tabs.id);
});

function parseTabs(url, id) {
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
				console.log(isMatch);
				var re = new RegExp(resp[key].website);
				if (re.test(url)) {
					if (isMatch === false) chrome.tabs.remove(id);

					isMatch = true;
				}
			}
		}
	});
}