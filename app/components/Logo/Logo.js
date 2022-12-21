import React, { useContext } from 'react';
import { View, Image } from 'react-native';
import { ThemeContext } from '../../context/context';

export default function Logo() {
	const { isThemeDark } = useContext(ThemeContext);
	return (
		<View style={{ marginBottom: 20 }}>
			<Image
				style={{ width: '100%', height: 100 }}
				source={
					isThemeDark ? require('../../../assets/images/logo.png') : require('../../../assets/images/logo_dark.png')
				}
			/>
		</View>
	);
}
