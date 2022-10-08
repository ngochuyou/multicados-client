import { useState, useReducer } from 'react';

export const useInput = initValue => {
	const [value, setValue] = useState(initValue);
	const onValueChange = useCallback(value => setValue(value), []);

	return [
		{ value, onChange: event => setValue(event.target.value) },
		onValueChange
	];
}

export const useInputKit = (initValue, initError = null) => {
	const [value, setValue] = useState(initValue);
	const [err, setError] = useState(initError);
	const onValueChange = useCallback(value => setValue(value), []);

	return [
		{ value, onChange: event => setValue(event.target.value) },
		onValueChange,
		err,
		setError
	];
}