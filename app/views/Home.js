<script src="http://localhost:8097"></script>;
import React, { useState } from 'react';
import { View } from 'react-native';
import Card from '../components/Card/Card';
import { Button, useTheme } from 'react-native-paper';

const Home = () => {
	const theme = useTheme();
	const [currentIndex, setCurrentIndex] = useState(0);
	return (
		<View style={{ flex: 1, backgroundColor: theme.colors.background }}>
			<View style={{ height: 20 }} />
			<Card setCurrentIndex={setCurrentIndex} currentIndex={currentIndex} />

			<View
				style={{
					paddingLeft: 10,
					paddingRight: 10,
					alignItems: 'center',
				}}>
				<Button
					icon="undo"
					mode="contained"
					onPress={() => setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : currentIndex)}
					labelStyle={{ fontSize: 20 }}
					style={{
						borderRadius: 999,
						width: '100%',
					}}></Button>
			</View>
			<View style={{ height: 10 }} />
		</View>
	);
	s;
};

export default Home;
