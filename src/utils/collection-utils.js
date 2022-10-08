export const intRange = ({ min = undefined, max = 0 }) => {
	if (min == null) {
		return [...Array(max)].map((ele, index) => index);
	}

	let val = min;

	return [...Array(Math.abs(min - max))].map(ele => val++);
};