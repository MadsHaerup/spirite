import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { Headline } from 'react-native-paper';
import Bar from '../components/Chart/BarChart';
import Pie from '../components/Chart/PieChart';
import { ThemeContext } from '../context/context';
import { useAttendanceStore } from '../store/store';

const Stats = () => {
	const { colors } = useContext(ThemeContext);
	const attendance = useAttendanceStore(state => state.attendance);
	const absence = useAttendanceStore(state => state.absence);
	return (
		<View
			style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.PrimaryBackground }}>
			<Headline style={{ color: colors.primary }}>Team Stats</Headline>
			<View style={{ flexDirection: 'row' }}>
				<Text style={{ marginRight: 10 }}>Attendance: {attendance}</Text>
				<Text>Absence: {absence}</Text>
			</View>
			<Bar />
			<Pie />
		</View>
	);
};

export default Stats;
