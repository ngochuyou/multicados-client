import { Link } from 'react-router-dom';

export function MainLogo({ to = null }) {
	return (
		<div
			className="uk-navbar-item uk-logo colors noselect pointer"
			style={{fontSize: "2rem"}}
		>
			<Link
				className="uk-link-reset"
				to={to}
			>Avocados</Link>
		</div>
	);
}