import React, { useContext, useMemo } from 'react';
import { ContributionGraph } from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemeContext, UserContext } from '../../context/context';
import { useQuery } from '../../context/realmContext';

const Contribution = () => {
	const { userId } = useContext(UserContext);
	const team = useQuery('Teams').filtered(`user_id == '${userId}'`)[0];
	const { colors } = useContext(ThemeContext);

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
					backgroundGradientFrom: colors?.chartFrom,
					backgroundGradientTo: colors?.chartTo,
					color: (opacity = 1) =>
						`rgba(${colors?.chartColor}, ${colors?.chartColor}, ${colors?.chartColor}, ${opacity})`,
				}}
				style={{
					marginVertical: 8,
					overflow: 'scroll',
				}}
			/>
		</ScrollView>
	);
};

export default Contribution;
