import { isFunction } from '../utils/assertion-utils';

import gbEnglish from '../assets/lang/en-GB';
import vietnamese from '../assets/lang/vi-VN';

export const LANG = {
	en_GB: {
		key: "en-GB",
		name: "English-UK"
	},
	vi_VN: {
		key: "vi-VN",
		name: "Tiếng Việt"
	}
}

const LANG_MAPPERS = {
	[LANG.en_GB.key]: key => gbEnglish[key],
	[LANG.vi_VN.key]: key => vietnamese[key]
}

export const ling = (lang, key) => {
	const langMapper = LANG_MAPPERS[lang];
	
	if (!isFunction(langMapper)) {
		return key;
	}

	return langMapper(key);
};
