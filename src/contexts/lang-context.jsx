import {
	createContext, useContext, useCallback, useState
} from 'react';

import { LANG } from '../libs/lingual';

import { isString } from '../utils/assertion-utils';

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

	return <LanguageContext.Provider value={{ set, ling }}>
		{ children }
	</LanguageContext.Provider>;
}