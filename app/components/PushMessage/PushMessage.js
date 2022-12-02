import React from 'react';
import Toast from 'react-native-root-toast';

export default function PushMessage({ color, background, message, state }) {
	return (
		<Toast
			visible={state}
			opacity={1}
			position={50}
			shadow={false}
			animation={true}
			hideOnPress={true}
			textColor={color}
			backgroundColor={background}>
			{message}
		</Toast>
	);
}
