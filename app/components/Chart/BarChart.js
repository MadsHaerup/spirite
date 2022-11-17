import React from 'react';
import { Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useAttendanceStore } from '../../store/store';

const Bar = () => {
	const attendance = useAttendanceStore(state => state.attendance);
	const absence = useAttendanceStore(state => state.absence);
	// const SCREEN_HEIGHT = Dimensions.get('window').height;
	const SCREEN_WIDTH = Dimensions.get('window').width;
	const data = {
		labels: ['Absence', 'Attendance'],
		datasets: [
			{
				data: [absence, attendance],
			},
		],
	};

	return (
		<BarChart
			data={data}
			width={SCREEN_WIDTH}
			height={220}
			yAxisLabel={''}
			chartConfig={{
				backgroundColor: '#1cc910',
				backgroundGradientFrom: '#eff3ff',
				backgroundGradientTo: '#efefef',
				decimalPlaces: 2,
				color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
				style: {
					borderRadius: 16,
				},
			}}
			style={{
				marginVertical: 8,
				borderRadius: 16,
			}}
		/>
	);
};

export default Bar;
