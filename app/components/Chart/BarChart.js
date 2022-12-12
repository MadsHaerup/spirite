import React, { useContext } from 'react';
import { Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { UserContext } from '../../context/context';
import { useEvents } from '../../Hooks/useEvents';
import { useQuery } from '../../models/model';
import { months } from '../../utils/Month/months';

const Bar = () => {
	const { userId } = useContext(UserContext);
	const team = useQuery('Teams').filtered(`user_id == '${userId}'`)[0];
	const events = months.map(month => useEvents(team, month));
	const SCREEN_WIDTH = Dimensions.get('window').width;
	const data = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

		datasets: [
			{
				data: [
					events[0] ? events[0] : 0,
					events[1] ? events[1] : 0,
					events[2] ? events[2] : 0,
					events[3] ? events[3] : 0,
					events[4] ? events[4] : 0,
					events[5] ? events[5] : 0,
					events[6] ? events[6] : 0,
					events[7] ? events[7] : 0,
					events[8] ? events[8] : 0,
					events[9] ? events[9] : 0,
					events[10] ? events[10] : 0,
					events[11] ? events[11] : 0,
				],
			},
		],
	};

	return (
		<BarChart
			fromZero
			data={data}
			width={SCREEN_WIDTH}
			height={220}
			yAxisLabel={''}
			chartConfig={{
				backgroundGradientFrom: '#0E1C26',
				backgroundGradientTo: '#294861',
				decimalPlaces: 0,
				color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
				barPercentage: 0.2,
			}}
			style={{
				marginVertical: 8,
				borderRadius: 16,
			}}
		/>
	);
};

export default Bar;
