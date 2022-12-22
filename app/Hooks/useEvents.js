import { useMemo } from 'react';

export const useEvents = (team, month) => {
	const months = [
		'january',
		'february',
		'march',
		'april',
		'may',
		'june',
		'july',
		'august',
		'september',
		'october',
		'november',
		'december',
	];

	const getMonth = date => {
		return months[new Date(date).getMonth()];
	};

	const events = useMemo(() => {
		return team?.players
			?.map(player => {
				return player.events?.filter(event => {
					return getMonth(event.date).toLowerCase().includes(month);
				});
			})
			.filter(event => event.length > 0)
			.map(event => event.length);
	}, [team]);

	let sum;
	if (events) {
		sum = events?.reduce((a, b) => a + b, 0);
	} else {
		sum = 0;
	}

	return sum;
};
