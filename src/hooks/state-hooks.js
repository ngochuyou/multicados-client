import { useReducer } from 'react';

export const useToggle = (initState = false) => useReducer(oldState => !oldState, initState);

export const useDispatch = (initStore = {}, dispatchers = {}) => useReducer(
	(oldState, { type = null, payload = null } = {}) => {
		const dispatcher = dispatchers[type];

		return dispatcher != null ? dispatcher(payload, oldState) : oldState;
	},
	{...initStore}
);