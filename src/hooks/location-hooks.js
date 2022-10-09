import { useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { isString, isFunction } from 'utils/assertion-utils';

const PAGE = "page";
const SIZE = "size";
const SORT = "sort";
const SORT_DESC = "desc";

export function useQuery() {
	const {
		search: query,
		pathname
	} = useLocation();
	const navigate = useNavigate();
	const params = useMemo(() => new URLSearchParams(query), [query]);

	const push = useCallback((key, valueCandidate) => {
		if (!isString(key)) {
			return;
		}

		const nextValue = !isFunction(valueCandidate) ? valueCandidate : valueCandidate(params.get(key));

		params.set(key, nextValue);
		navigate(`${pathname}?${params.toString()}`);
	}, [params, navigate, pathname]);

	return {
		params,
		[PAGE]: +params.get(PAGE) || 0,
		[SIZE]: +params.get(SIZE) || 10,
		[SORT]: params.get(SORT) || SORT_DESC,
		push
	};
}