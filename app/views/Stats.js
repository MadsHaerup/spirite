import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Headline } from 'react-native-paper';
import Bar from '../components/Chart/BarChart';
import BezierLineChart from '../components/Chart/BezierLineChart';
import Contribution from '../components/Chart/Contribution';
import Pie from '../components/Chart/PieChart';
import { ThemeContext } from '../context/context';
import { useAttendanceStore } from '../store/store';

const Stats = () => {
	const { colors } = useContext(ThemeContext);
	const attendance = useAttendanceStore(state => state.attendance);
	const absence = useAttendanceStore(state => state.absence);
	return (
		<ScrollView style={{ backgroundColor: colors?.PrimaryBackground }}>
			<View style={{ flex: 1, paddingTop: 60, alignItems: 'center', backgroundColor: colors?.PrimaryBackground }}>
				<Headline style={{ color: colors?.primary, fontWeight: 'bold' }}>Team Stats</Headline>
				<BezierLineChart />
				<Bar />
				<Contribution />
				<Headline style={{ color: colors?.primary, fontWeight: 'bold' }}>Daily stats</Headline>
				<View style={{ flexDirection: 'row' }}>
					<Text style={{ marginRight: 10, color: colors?.primary }}>Attendance: {attendance}</Text>
					<Text style={{ color: colors?.primary }}>Absence: {absence}</Text>
				</View>
				<Pie />
			</View>
		</ScrollView>
	);
};

export default Stats;
