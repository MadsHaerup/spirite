import { useContext } from 'react';
import { Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { ThemeContext } from '../../context/context';
import { useAttendanceStore } from '../../store/store';

const Pie = () => {
	const attendance = useAttendanceStore(state => state.attendance);
	const absence = useAttendanceStore(state => state.absence);
	const SCREEN_WIDTH = Dimensions.get('window').width;
	const { colors } = useContext(ThemeContext);

	return (
		<PieChart
			data={[
				{
					name: 'Absence',
					attendance: absence,
					color: '#B17478',
					legendFontColor: colors?.primary,
					legendFontSize: 15,
				},
				{
					name: 'Attendance',
					attendance: attendance,
					color: '#87A3A3',
					legendFontColor: colors?.primary,
					legendFontSize: 15,
				},
			]}
			width={SCREEN_WIDTH}
			height={220}
			chartConfig={{
				backgroundColor: '#1cc910',
				backgroundGradientFrom: colors?.chartFrom,
				backgroundGradientTo: colors?.chartTo,
				decimalPlaces: 2,
				color: (opacity = 1) => `rgba(${colors?.chartColor}, ${colors?.chartColor}, ${colors?.chartColor}, ${opacity})`,
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
