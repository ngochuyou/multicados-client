import { useRouteError } from "react-router-dom";

import cloud from '../assets/img/cloud-s.png';

export default function ErrorPage() {
	const error = useRouteError();
	console.log(error);
	return (
		<div className="uk-position-center uk-box-shadow-hover-medium uk-padding">
			<div className="uk-flex uk-width-xlarge">
				<div className="uk-margin-right">
					<img src={cloud} style={{ width: "100px", height: "100px" }} alt="Error page logo"/>
				</div>
				<div className="uk-position-relative">
					<h1 className="uk-position-center colors uk-text-bold">Oops!</h1>
				</div>
			</div>
			<hr className="uk-divider-icon"/>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
		</div>
	);
}