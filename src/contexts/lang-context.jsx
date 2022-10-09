import {
	createContext, useContext, useCallback, useState
} from 'react';

import { LANG, JOHN_DOE } from '../libs/lingual';

import { isString, isFunction } from '../utils/assertion-utils';

import { ling as lingual } from '../libs/lingual';

const LanguageContext = createContext({});

const LOCAL_STORAGE_LANG_KEY = "lang";

export const useLang = () => useContext(LanguageContext);

export default function LanguageContextProvider({ children }) {
	const [lang, setLang] = useState(localStorage.getItem(LOCAL_STORAGE_LANG_KEY) || LANG.en_GB.key);

	const set = useCallback(candidateLanguage => {
		if (!isString(candidateLanguage) || lang === candidateLanguage) {
			return;
		}

		setLang(candidateLanguage);
		localStorage.setItem(LOCAL_STORAGE_LANG_KEY, candidateLanguage);
	}, [lang]);

	const ling = useCallback(key => lingual(lang, key), [lang]);

	const lingFrom = useCallback((dictionary = {}) => {
		const candidate = dictionary[lang];

		if (isFunction(candidate)) {
			return candidate();
		}

		return candidate != null ? candidate : JOHN_DOE;
	}, [lang]);

	return <LanguageContext.Provider value={{
		set, ling, lingFrom
	}}>
		{ children }
	</LanguageContext.Provider>;
}