import { NoFollow } from 'components/ui/Link';

import LanguageControl from './LanguageControl';

import { useLang } from 'contexts/lang-context';

import { NAV_SETTINGS, NAV_SETTINGS_GENERAL } from 'constants/messages/ui/nav';

export default function Settings() {
	const { ling } = useLang();

	return (
		<>
			<NoFollow>{ling(NAV_SETTINGS)}</NoFollow>
            <div className="uk-navbar-dropdown uk-width-medium">
                <ul className="uk-nav uk-navbar-dropdown-nav">
                    <li className="uk-active">
                    	<div className="uk-text-bold">
                    		{ling(NAV_SETTINGS_GENERAL)}
                		</div>
                    	<ul className="uk-nav-sub">
                    		<li><LanguageControl /></li>
                    	</ul>
                	</li>
                </ul>
            </div>
		</>
	);
}