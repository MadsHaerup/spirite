import React from 'react';
import { ImageBackground, View } from 'react-native';
import { Dimensions } from 'react-native';

const Lineup = () => {
	const SCREEN_WIDTH = Dimensions.get('window').width;
	const SCREEN_HEIGHT = Dimensions.get('window').height;

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
			<View
				style={{
					position: 'absolute',
					top: 170,
					zIndex: 10,
					flexDirection: 'row',
					justifyContent: 'space-between',
					width: SCREEN_WIDTH - 80,
				}}></View>

			<ImageBackground
				source={require('../../../assets/images/field.png')}
				resizeMode="contain"
				style={{
					transform: [{ rotate: '90deg' }],
					width: SCREEN_HEIGHT,
					height: SCREEN_WIDTH,
				}}></ImageBackground>
		</View>
	);
};
export default Lineup;
