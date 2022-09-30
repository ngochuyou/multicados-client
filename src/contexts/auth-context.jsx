import {
	createContext, useContext, useEffect,
	useCallback, useState
} from 'react';

import { fetchPrincipal } from '../services/auth-service';

import Account from '../data/models/Account';

const AuthenticationContext = createContext({});

export const useAuth = () => useContext(AuthenticationContext);

const doFetchPrincipal = async (setPrincipal = () => null) => {
	let [principal, err] = await fetchPrincipal([
		"username", "role", "firstName",
		"lastName", "photo", "phone"
	]);

	if (err) {
		console.error(err);
		return;
	}

	setPrincipal(new Account(principal));
};

export default function AuthenticationContextProvider({ children }) {
	const [principal, setPrincipal] = useState(null);

	useEffect(() => {
		doFetchPrincipal(setPrincipal);

		return () => setPrincipal(null);
	}, []);

	const evictPrincipal = useCallback(() => setPrincipal(null), []);
	const modifyPrincipal = useCallback(nextState => setPrincipal({
		...principal,
		...nextState
	}), [principal]);

	return <AuthenticationContext.Provider value={{
		principal, evictPrincipal, modifyPrincipal
	}}>
		{ children }
	</AuthenticationContext.Provider>;
}