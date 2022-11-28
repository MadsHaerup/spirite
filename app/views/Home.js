import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import Card from '../components/Card/Card';
import { Button, useTheme } from 'react-native-paper';
import Details from '../components/Modal/Details';
import { UserContext } from '../context/context';
import { useQuery } from '../models/Player';

const Home = () => {
	const theme = useTheme();
	const [currentIndex, setCurrentIndex] = useState(0);
	const { userId } = useContext(UserContext);
	const userTeam = useQuery('Teams').filtered(`user_id == '${userId}'`)[0];

	return (
		<View style={{ flex: 1, backgroundColor: theme.colors.background, position: 'relative' }}>
			<View style={{ height: 20 }} />

			{userTeam === undefined ? (
				<View style={{ zIndex: 100, height: '100%', width: '100%', position: 'absolute' }}>
					<Details />
				</View>
			) : null}

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
