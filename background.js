async function scan(port) {
	const url = `http://localhost:${port}`;
	try {
		const response = await fetch(url, { mode: 'no-cors' });
		if (response.ok) {
			chrome.tabs.create({ url });
		}
	} catch (error) {
	}
}

chrome.action.onClicked.addListener(async () => {
	const { ports } = await chrome.storage.local.get('ports');
	const ranges = ports.split(',').filter(i => i !== '');

	for (let range of ranges) {
		const nums = range.split('-');
		if (nums.length === 2) {
			const num1 = parseFloat(nums[0]);
			const num2 = parseFloat(nums[1]);
			if (num1 <= num2) {
				for (let i = num1; i <= num2; i++) {
					await scan(i);
				}
			} else {
				for (let i = num2; i <= num1; i++) {
					await scan(i);
				}
			}
		} else {
			const num = parseFloat(range);
			await scan(num);
		}
	}
});

chrome.runtime.onInstalled.addListener(function (details) {
	if (details.reason === "install") {
		chrome.runtime.openOptionsPage();
	}
});