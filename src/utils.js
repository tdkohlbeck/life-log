export const getTimeString = (
	time = Date.now(),
	selectors = ['Hours', 'Minutes', 'Seconds']
) => {
	let digits = selectors.map((selector) => {
		let method = `get${selector}`;
		let digit = new Date(time)[method]();
		if (digit < 10) digit = `0${digit}`;
		return digit;
	});
	return `${digits[0]}:${digits[1]}:${digits[2]}`;
};
