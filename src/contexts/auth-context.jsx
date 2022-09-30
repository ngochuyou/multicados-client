import {
	createContext, useContext, useEffect,
	useCallback, useState
} from 'react';

import { fetchPrincipal } from '../services/auth-service';

import Account from '../data/models/Account';

import { useAlert, STYLES as ALERT_STYLES } from './alert-context';
import { useLang } from './lang-context';

import { UNABLE_TO_FETCH } from '../constants/messages/fetch';

const AuthenticationContext = createContext({});

export const useAuth = () => useContext(AuthenticationContext);

const doFetchPrincipal = async ({
	setPrincipal = () => null,
	pushError = () => null,
	evictPrincipal = () => null,
	errorProducer = () => null
}) => {
	const [principal, error] = await fetchPrincipal([
		"username", "role", "firstName",
		"lastName", "photo", "phone"
	]);

	if (error) {
		pushError({
			content: errorProducer(error),
			type: ALERT_STYLES.ERROR
		});
		setPrincipal(null);
		return;
	}

	setPrincipal(new Account(principal));
};

export default function AuthenticationContextProvider({ children }) {
	const [principal, setPrincipal] = useState(null);

	const { ling } = useLang();

	const evictPrincipal = useCallback(() => setPrincipal(null), []);

	const modifyPrincipal = useCallback(nextState => setPrincipal({
		...principal,
		...nextState
	}), [principal]);

	const { push: pushError } = useAlert();

	useEffect(() => {
		doFetchPrincipal({
			setPrincipal,
			pushError,
			evictPrincipal,
			errorProducer: error => `${ling(UNABLE_TO_FETCH)}: ${error}`
		});

		return evictPrincipal;
	}, [evictPrincipal, pushError, ling]);

	return <AuthenticationContext.Provider value={{
		principal, evictPrincipal, modifyPrincipal
	}}>
		{ children }
	</AuthenticationContext.Provider>;
}