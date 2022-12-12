import React, { useContext, useEffect, useMemo } from 'react';
import { ContributionGraph } from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';
import { UserContext } from '../../context/context';
import { useQuery } from '../../models/model';

const Contribution = () => {
	const { userId } = useContext(UserContext);
	const team = useQuery('Teams').filtered(`user_id == '${userId}'`)[0];

	const events = useMemo(() => {
		return team?.players
			?.map(player => {
				return player.events?.filter(event => event.date);
			})
			.filter(event => event.length > 0);
	}, [team]);

	const getData = () => {
		const data = [];
		useMemo(() => {
			return events?.flat()?.reduce((a, c) => {
				data.push({
					date: c.date,
					count: events?.length,
				});
			}, {});
		}, [events]);
		return data;
	};

	const chartData = getData();

	return (
		<ScrollView horizontal>
			<ContributionGraph
				values={chartData}
				numDays={365}
				width={1150}
				height={220}
				chartConfig={{
					backgroundGradientFrom: '#0E1C26',
					backgroundGradientTo: '#294861',
					color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
				}}
				style={{
					marginVertical: 8,
					borderRadius: 16,
					overflow: 'scroll',
				}}
			/>
		</ScrollView>
	);
};

export default Contribution;
