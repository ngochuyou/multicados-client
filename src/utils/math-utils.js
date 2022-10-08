export const tryParseInt = (candidate, alternative = 0) => {
	if (isNaN(candidate)) {
		return alternative;
	}

	return parseInt(candidate);
}