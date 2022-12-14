import {
	createContext, useContext, useCallback,
	useReducer
} from 'react';

import { isString } from '../utils/assertion-utils';

import {
	Error, Success, Info
} from '../components/ui/Alert';

const AlertContext = createContext({});

export const useAlert = () => useContext(AlertContext);

const PUSH = "PUSH";
const EVICT = "EVICT";

export const STYLES = {
	ERROR: "ERROR",
	SUCCESS: "SUCCESS",
	INFO: "INFO"
};
const STYLE_MAPPERS = {
	[STYLES.ERROR]: props => <Error {...props}></Error>,
	[STYLES.SUCCESS]: props => <Success {...props}></Success>,
	[STYLES.INFO]: props => <Info {...props}></Info>
};

export default function AlertContextProvider({ children }) {
	const doPush = (previousAlerts, { content = null, type = null }) =>
		isString(content) && isString(type) && STYLE_MAPPERS[type] != null
			? [...previousAlerts, { content, type }]
			: previousAlerts;

	const doEvict = (previousAlerts, targetIndex) => previousAlerts.filter((alert, index) => index !== targetIndex);

	const [alerts, dispatch] = useReducer(
		(previousAlerts, { action = "", payload = null }) => {
			switch(action) {
				case PUSH: return doPush(previousAlerts, payload);
				case EVICT: return doEvict(previousAlerts, payload);
				default: return previousAlerts;
			}
		},
		[]
	);

	const push = useCallback(nextAlert => dispatch({
		action: PUSH,
		payload: nextAlert
	}), []);

	const evict = useCallback(targetIndex => dispatch({
		action: EVICT,
		payload: targetIndex
	}), []);

	return <AlertContext.Provider value={{
		push, evict
	}}>
		<AlertList alerts={alerts}></AlertList>
		{ children }
	</AlertContext.Provider>;
}

function AlertList({ alerts = [] }) {
	const { evict } = useAlert();

	return (
		<div className="uk-width-large uk-position-fixed uk-position-small uk-position-bottom-left">
		{
			alerts.map((alert, index) => STYLE_MAPPERS[alert.type]({
				content: alert.content,
				key: index,
				onClose: () => evict(index)
			}))
		}
		</div>
	);
}
