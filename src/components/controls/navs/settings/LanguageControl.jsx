import { useRef } from 'react';

import { NoFollow } from 'components/ui/Link';

import { useLang } from 'contexts/lang-context';

import { LANG } from 'libs/lingual';

import { NAV_SETTINGS_GENERAL_LANG } from 'constants/messages/ui/nav';

export default function LanguageControl() {
	const { set: setLang, ling } = useLang();
	const closeBtnRef = useRef();

	const onLangChoose = (langKey) => {
		setLang(langKey);
		closeBtnRef.current.click();		
	};

	return (
		<>
			<a
				href="#nav-lang-bar"
				uk-toggle=""
			>
				{ling(NAV_SETTINGS_GENERAL_LANG)}
			</a>
			<div
				id="nav-lang-bar" uk-offcanvas="flip: true; overlay: true"
			>
			    <div className="uk-offcanvas-bar">
			    	<button
			    		className="uk-offcanvas-close" type="button" uk-close=""
			    		ref={closeBtnRef}
		    		></button>
			        <ul className="uk-nav uk-nav-default">
			        {
			        	Object.values(LANG)
			        		.map(({key, name}) => (
			        			<li key={key}>
					            	<NoFollow
					            		onClick={() => onLangChoose(key)}
					            	>{name}</NoFollow>
				            	</li>
		        			))
			        }
			        </ul>
			    </div>
			</div>
		</>
	);
}