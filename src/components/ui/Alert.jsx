import { NoFollow } from './Link';

function Alert({ content, onClose = () => null, alertType = "" }) {
	return (
		<div className={`${alertType}`} uk-alert="">
			<NoFollow
				className="close noselect" uk-close=""
				onClick={onClose}
			></NoFollow>
			<p>{content}</p>
		</div>
	);
}


export function Error(props) {
	return <Alert {...props } alertType={"uk-alert-danger"}></Alert>;
}

export function Success(props) {
	return <Alert {...props} alertType="uk-alert-success"></Alert>;
}

export function Info(props) {
	return <Alert {...props} alertType="backgroundf"></Alert>;
}
