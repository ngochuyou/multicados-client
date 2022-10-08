import { isFunction } from '../../utils/assertion-utils';

export function NoFollow(props) {
	const preventFollowClick = (event) => {
		event.preventDefault();

		const { onClick } = props;

		if (isFunction(onClick)) {
			onClick(event);
			return true;
		}

		return false;
	};

	return (
		<a
			{...props}
			onClick={preventFollowClick}
		>{props.children}</a>
	);
}