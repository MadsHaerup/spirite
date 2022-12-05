import React from 'react';
import { View, Image } from 'react-native';

export default function Logo() {
	return (
		<View style={{ marginBottom: 20 }}>
			<Image style={{ width: '100%', height: 100 }} source={require('../../../assets/images/logo.png')} />
		</View>
	);
}
