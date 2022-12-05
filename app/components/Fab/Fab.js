import React, { useContext, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { FAB } from 'react-native-paper';
import { ThemeContext } from '../../context/context';

const Fab = ({ handlePress }) => {
	const { colors } = useContext(ThemeContext);

	return (
		<SafeAreaView style={{ flexGrow: 1 }}>
			<FAB
				icon={'plus'}
				label={'Add'}
				onPress={() => {
					handlePress();
				}}
				visible="true"
				iconMode={'static'}
				style={{ bottom: 16, right: 16, position: 'absolute', backgroundColor: colors.icons }}
				color={`${colors.primary}`}
			/>
		</SafeAreaView>
	);
};

export default Fab;
