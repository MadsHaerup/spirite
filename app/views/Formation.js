import React, { useContext } from 'react';
import { View } from 'react-native';
import { Headline } from 'react-native-paper';
import Lineup from '../components/Lineup/Lineup';
import { ThemeContext } from '../context/context';

const Formation = () => {
	const { colors } = useContext(ThemeContext);
	return (
		<View style={{ flex: 1, backgroundColor: colors.lineup }}>
			<Headline
				style={{
					textAlign: 'center',
					marginTop: 60,
					color: colors.buttonContent,
					fontWeight: 'bold',
				}}>
				Line Up
			</Headline>
			<Lineup />
		</View>
	);
};

export default Formation;
