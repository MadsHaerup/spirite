import { Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useAttendanceStore } from '../../store/store';

const Pie = () => {
	const attendance = useAttendanceStore(state => state.attendance);
	const absence = useAttendanceStore(state => state.absence);
	// const SCREEN_HEIGHT = Dimensions.get('window').height;
	const SCREEN_WIDTH = Dimensions.get('window').width;

	return (
		<PieChart
			data={[
				{
					name: 'Absence',
					attendance: absence,
					color: '#8980F5',
					legendFontColor: '#7F7F7F',
					legendFontSize: 15,
				},
				{
					name: 'Attendance',
					attendance: attendance,
					color: '#3B3561',
					legendFontColor: '#7F7F7F',
					legendFontSize: 15,
				},
			]}
			width={SCREEN_WIDTH}
			height={220}
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
			accessor="attendance"
			backgroundColor="transparent"
			paddingLeft="15"
		/>
	);
};

export default Pie;
