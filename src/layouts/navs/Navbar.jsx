export default function Navbar({ leftNav = null, centerNav = null, rightNav = null }) {
	return (
		<div
			uk-sticky="animation: uk-animation-slide-top; sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky; cls-inactive: uk-background-default; top: 200"
		>
			<nav
				className="main-nav uk-navbar-container uk-position-relative uk-padding-small"
				style={{height: "50px"}}
				uk-navbar="mode: click"
			>
				<div className="uk-navbar-left uk-padding-small uk-padding-remove-top uk-padding-remove-right uk-padding-remove-bottom" uk-height-match="">
				{ leftNav }	
				</div>
				<div className="uk-navbar-center">
				{ centerNav }
				</div>
				<div className="uk-navbar-right">
				{ rightNav }
				</div>
			</nav>
		</div>
	);
}
