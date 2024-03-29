import React, { useContext } from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ThemeContext, UserContext } from '../../context/context';
import { useQuery } from '../../context/realmContext';
import { useEvents } from '../../Hooks/useEvents';
import { months } from '../../utils/data/months';

const BezierLineChart = () => {
	const { userId } = useContext(UserContext);
	const team = useQuery('Teams').filtered(`user_id == '${userId}'`)[0];
	const SCREEN_WIDTH = Dimensions.get('window').width;
	const { colors } = useContext(ThemeContext);

	const events = months.map(month => useEvents(team, month));

	const data = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		datasets: [
			{
				data: [
					events[0],
					events[1],
					events[2],
					events[3],
					events[4],
					events[5],
					events[6],
					events[7],
					events[8],
					events[9],
					events[10],
					events[11],
				],
			},
		],
		legend: ['Participation'],
	};

	return (
		<LineChart
			fromZero
			data={data}
			width={SCREEN_WIDTH}
			height={220}
			yAxisLabel={''}
			segments={2}
			chartConfig={{
				backgroundGradientFrom: colors?.chartFrom,
				backgroundGradientTo: colors?.chartTo,
				decimalPlaces: 0,
				color: (opacity = 1) => `rgba(${colors?.chartColor}, ${colors?.chartColor}, ${colors?.chartColor}, ${opacity})`,
			}}
			bezier
			style={{
				marginVertical: 8,
			}}
		/>
	);
};

export default BezierLineChart;
