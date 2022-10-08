import CustomerProductViewing from '../features/customer-product-viewing';

export default function HomePage() {
	return (
		<div className="uk-grid-small" uk-grid="">
			<CustomerProductViewing />
		</div>
	);
}