import { Link } from 'react-router-dom';

import Layout from '../../../layouts/navs/Navbar';

import { NoFollow } from '../../ui/Link';
import { MainLogo } from '../../ui/Logo';

import { useToggle } from '../../../hooks/state-hooks';

import { useLang } from '../../../contexts/lang-context';

import { isString } from '../../../utils/assertion-utils';

import { NAV_FAV, NAV_SIGN_UP_SIGN_IN } from '../../../constants/messages/ui/nav';

import Settings from './settings/Settings';

const DEFAULT_LOGO_CLICK_DESTINATION = "/";

export default function Navbar({
	logoClickDestination = DEFAULT_LOGO_CLICK_DESTINATION
}) {
	return (
		<Layout
			centerNav={
				<MainLogo
					to={isString(logoClickDestination) ? logoClickDestination : DEFAULT_LOGO_CLICK_DESTINATION}
				/>
			}
			rightNav={<UnauthenticatedRightNavbar />}
		/>
	);
}

function UnauthenticatedRightNavbar({
	className=""
}) {
	return (
		<ul className="uk-navbar-nav">
			<li><FavoriteProductsNav /></li>
			<li><SignUpSignIn /></li>
			<li><Settings /></li>
		</ul>
	);
}

function SignUpSignIn() {
	const { ling } = useLang();
	const [isAuthModalVisible, toggleAuthModalVision] = useToggle();

	const onSignUpSignInClick = () => toggleAuthModalVision();
	
	return (
		<>
			<NoFollow
				onClick={onSignUpSignInClick}
			>{ling(NAV_SIGN_UP_SIGN_IN)}</NoFollow>
			{/*{
				asIf(authModalVisible)
				.then(() => (
					<CenterModal
						close={toggleAuthModalVision}
						className="uk-border-rounded"
					>
						<div className="uk-grid-medium uk-child-width-1-2" uk-grid="">
							<div className="uk-position-relative">
								<div className="uk-position-center">
									<LoginForm />
								</div>
							</div>
							<div>
								<RegisterForm
									onSuccess={() => window.location.reload(true)}
								/>
							</div>
						</div>
					</CenterModal>
				))
				.else()
			}*/}
		</>
	);
}

function FavoriteProductsNav() {
	const { ling } = useLang();

	return (
		<Link to="/fav">
			{ling(NAV_FAV)}
		</Link>
	);
}