import { Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useAttendanceStore } from '../../store/store';

const Pie = () => {
	const attendance = useAttendanceStore(state => state.attendance);
	const absence = useAttendanceStore(state => state.absence);
	const SCREEN_WIDTH = Dimensions.get('window').width;

	return (
		<PieChart
			data={[
				{
					name: 'Absence',
					attendance: absence,
					color: '#87A3A3',
					legendFontColor: '#fff',
					legendFontSize: 15,
				},
				{
					name: 'Attendance',
					attendance: attendance,
					color: '#AC8D9A',
					legendFontColor: '#fff',
					legendFontSize: 15,
				},
			]}
			width={SCREEN_WIDTH}
			height={220}
			chartConfig={{
				backgroundColor: '#1cc910',
				backgroundGradientFrom: '#0E1C26',
				backgroundGradientTo: '#294861',
				decimalPlaces: 2,
				color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
