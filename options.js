document.getElementById('feedback').addEventListener('click', () => {
	chrome.tabs.create({ url: 'https://github.com/kaito4681/localhost-scanner-chrome-extension/issues' });
});

document.getElementById('about').addEventListener('click', () => {
	chrome.tabs.create({ url: 'https://github.com/kaito4681/localhost-scanner-chrome-extension' });
});