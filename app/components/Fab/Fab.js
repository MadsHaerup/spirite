import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native';
import { FAB } from 'react-native-paper';
import { ThemeContext } from '../../context/context';

const Fab = ({ handlePress, icon, label, color, style }) => {
	const { colors } = useContext(ThemeContext);

	return (
		<SafeAreaView style={{ flexGrow: 1 }}>
			<FAB
				icon={icon}
				label={label}
				onPress={() => {
					handlePress();
				}}
				visible="true"
				iconMode={'static'}
				style={{ ...style, bottom: 16, right: 16, position: 'absolute' }}
				color={color ? color : `${colors.primary}`}
			/>
		</SafeAreaView>
	);
};

export default Fab;
