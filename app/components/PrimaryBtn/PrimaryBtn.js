import React, { useContext } from 'react';
import { Button } from 'react-native-paper';
import { ThemeContext } from '../../context/context';

const PrimaryBtn = ({ style, icon, handlePress, content }) => {
	const { colors } = useContext(ThemeContext);
	return (
		<Button
			icon={icon ? icon : null}
			mode="contained"
			onPress={() => handlePress()}
			labelStyle={{ color: colors.primary }}
			style={{
				...style,
				backgroundColor: colors.button,
				justifyContent: 'center',
				alignSelf: 'center',
			}}>
			{content ? content : null}
		</Button>
	);
};

export default PrimaryBtn;
