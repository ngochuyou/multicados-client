import { createContext, useContext, useCallback } from 'react';

import { useDispatch } from '../hooks/state-hooks';

const INIT_STATE = {
	category: {
		list: []
	}
};

const ProductContext = createContext(INIT_STATE);

export const useProduct = () => useContext(ProductContext);

const INIT = "INIT";

const SET_CATEGORY_LIST = "SET_CATEGORY_LIST";

const DISPATCHERS = {
	[INIT]: () => ({ ...INIT_STATE }),
	[SET_CATEGORY_LIST]: (payload = [], oldState) => ({
		...oldState,
		category: {
			...oldState.category,
			list: payload
		}
	})
};

export default function ProductContextProvider({ children }) {
	const [store, dispatch] = useDispatch({ ...INIT_STATE }, DISPATCHERS);

	const init = useCallback(() => dispatch({ type: INIT }), [dispatch]);

	const setCategoryList = useCallback((list) => {
		if (!Array.isArray(list)) {
			return;
		}

		dispatch({
			type: SET_CATEGORY_LIST,
			payload: list
		});
	}, [dispatch]);

	return (
		<ProductContext.Provider value={{
			category: store.category,
			init,
			setCategoryList
		}}>
			{ children }
		</ProductContext.Provider>
	);
}
