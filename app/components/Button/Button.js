import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = props => {
	const { text, fn, btnStyle, btnTextStyle } = props;
	return (
		<TouchableOpacity onPress={fn} style={btnStyle}>
			<Text style={btnTextStyle}>{text}</Text>
		</TouchableOpacity>
	);
};

export default Button;
