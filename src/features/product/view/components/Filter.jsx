import { useEffect } from 'react';

import { useLang  } from 'contexts/lang-context';
import { useProduct } from 'contexts/product-context'
import { useAlert, STYLES as ALERT_STYLES } from 'contexts/alert-context';

import { useQuery } from 'hooks/location-hooks';

import { FILTER_CATEGORY } from '../messages';
import { UNABLE_TO_FETCH } from 'constants/messages/libs/fetch';

import { getCategories } from 'services/product/category-service';

export default function Filter() {
	const { ling, lingFrom } = useLang();
	const {
		category: { list: categories },
		setCategoryList, init: initProductContext
	} = useProduct();
	const { push: pushAlert } = useAlert();
	const { push: pushQuery } = useQuery();

	useEffect(() => {
		const doFetch = async () => {
			const [categories, err] = await getCategories();

			if (err) {
				pushAlert({
					type: ALERT_STYLES.ERROR,
					content: `${ling(UNABLE_TO_FETCH)}: ${err}`
				});
				return;
			}

			setCategoryList(categories);
		};

		doFetch();

		return initProductContext;
	}, [setCategoryList, pushAlert, ling, initProductContext]);

	return (
		<section className="uk-width-1-4 uk-box-shadow">
			<ul className="uk-nav uk-nav-center uk-margin-auto-vertical">
				<li className="uk-nav-header uk-text-bold">{ling(FILTER_CATEGORY)}</li>
				{
					categories.map(category => (
						<li
							onClick={() => pushQuery("page", o => +o + 1)}
							key={category.id} className="uk-margin pointer noselect"
						>
							<div className="uk-transition-toggle">
								<div
									className="uk-transition-scale-up"
									style={{ opacity: "1" }}
								>{lingFrom(category.name)}</div>
							</div>
						</li>
					))
				}
			</ul>
		</section>
	);
}