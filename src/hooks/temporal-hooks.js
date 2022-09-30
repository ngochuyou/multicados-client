import { useEffect, useState, useReducer } from 'react';

import { MONTH_NAMES, DAY_NAMES } from '../utils/temporal-utils';
import { intRange } from '../utils/collection-utils';
import { tryParseInt } from '../utils/math-utils';

const getYearsFromOffset = offset => {
	const offsetDate = new Date(`01-01-${offset}`);

	return [
		...intRange({min: 1, max: 11}).map(index => offsetDate.getFullYear() - index),
		...[offset],
		...intRange({min: 1, max: 11}).map(index => offsetDate.getFullYear() + index),
	];
}

const monthSet = MONTH_NAMES.map((name, index) => ({
	value: index + 1,
	name
}));

const getMonthValue = date => date.getMonth() + 1;

export const useTemporal = ({
	initYears = null,
	initSelectedYear = undefined,
	initMonths = null,
	initSelectedMonth = undefined,
	initDays = null,
	initSelectedDay = undefined
} = {}) => {
	const current = new Date();
	const defaultYear = current.getFullYear();
	const [years, setYears] = useState(initYears == null ? getYearsFromOffset(defaultYear) : initYears);
	const [selectedYear, setSelectedYear] = useReducer((current, next) => tryParseInt(next, defaultYear), initSelectedYear || defaultYear);
	const [months, setMonths] = useState(initMonths == null ? monthSet : initMonths);
	const [selectedMonth, setSelectedMonth] = useReducer((current, next) => tryParseInt(next, getMonthValue(current)), initSelectedMonth || getMonthValue(current));
	const [days, setDays] = useState(initDays == null ? [] : initDays);
	const [selectedDay, setSelectedDay] = useReducer((current, next) => tryParseInt(next, current.getDate()), initSelectedDay || current.getDate());

	useEffect(() => {
		setDays(intRange({min: 0, max: new Date(selectedYear, selectedMonth, 0).getDate() + 1}).map(index => ({
			value: index + 1,
			name: DATE_NAMES[index]
		})));
	}, [selectedYear, selectedMonth]);

	return [
		years, setYears,
		selectedYear, setSelectedYear,
		months, setMonths,
		selectedMonth, setSelectedMonth,
		days, setDays,
		selectedDay, setSelectedDay
	];
};