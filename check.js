function checkNaN(num) {
	if (isNaN(num)) {
		throw new Error(`${num} is not a valid number.`);
	}
}

function checkInt(num) {
	if (!Number.isInteger(num)) {
		throw new Error(`${num} is not an integer.`);
	}
}

function checkRange(num) {
	if (num < 0 || num > 65535) {
		throw new Error(`${num} is invalid range (0-65535).`);
	}
}


function check(input) {
	input = input.replace(/\s+/g, '');
	const ranges = input.split(',').filter(i => i !== '');
	for (let range of ranges) {
		console.log(range);
		const nums = range.split('-');
		if (nums.length >= 3) {
			throw new Error('Invalid range format.');
		} else if (nums.length === 2) {
			if (nums.length === 2) {
				const num1 = parseFloat(nums[0]);
				const num2 = parseFloat(nums[1]);
				checkNaN(nums[0]);
				checkNaN(nums[1]);
				if (nums[0] === "" || nums[1] === "") {
					throw new Error(`${range} contains a hyphen without numbers on both sides.`);
				}
				checkInt(num1);
				checkInt(num2);
				checkRange(num1);
				checkRange(num2);
			}
		} else {
			const num = parseFloat(range);
			checkNaN(range);
			if (range === "") {
				throw new Error('The number is empty.');
			}
			checkInt(num);
			checkRange(num);
		}
	}
}

document.getElementById('save').addEventListener('click', () => {
	const input = document.querySelector('input').value.replace(/\s+/g, '');;
	try {
		check(input);
		chrome.storage.local.set({ ports: input }, () => {
			document.getElementById('status').textContent = 'Options saved.';
			document.getElementById('current').textContent = input;
		});
	} catch (e) {
		document.getElementById('status').textContent = e.message;
	}
});


chrome.storage.local.get('ports', (data) => {
	if (data && data.ports) {
		document.querySelector('input').value = data.ports;
		document.getElementById('current').textContent = data.ports;
	} else {
		document.querySelector('input').value = '3000-3005,8000,8080';
		document.getElementById('current').textContent = '3000-3005,8000,8080';
		chrome.storage.local.set({ ports: '3000-3005,8000,8080' });
	}
});
