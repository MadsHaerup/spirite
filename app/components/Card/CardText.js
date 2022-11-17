import React from 'react';
import { Text } from 'react-native';

const CardText = ({ children }) => {
	return (
		<Text
			style={{
				position: 'absolute',
				bottom: 10,
				zIndex: 1000,
				fontSize: 32,
				color: '#000',
				fontWeight: '600',
				width: '100%',
				textAlign: 'center',
				filter: 'blur(20px)',
				backgroundColor: 'rgba(255, 255, 255, 0.5)',
				borderRadius: 20,
				padding: 10,
				marginLeft: 10,
				marginRight: 10,
				overflow: 'hidden',
			}}>
			{children}
		</Text>
	);
};

export default CardText;
