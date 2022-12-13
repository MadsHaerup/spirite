import React from 'react';
import { ImageBackground, View } from 'react-native';
import { Dimensions } from 'react-native';
import Team from './Team';

const Lineup = () => {
	const SCREEN_WIDTH = Dimensions.get('window').width;
	const SCREEN_HEIGHT = Dimensions.get('window').height;

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Team />

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
