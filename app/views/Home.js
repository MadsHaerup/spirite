import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import Card from '../components/Card/Card';
import { Button, Text } from 'react-native-paper';
import Details from '../components/Modal/Details';
import { ThemeContext, UserContext } from '../context/context';
import { useQuery } from '../models/model';
import PrimaryBtn from '../components/PrimaryBtn/PrimaryBtn';

const Home = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const { userId } = useContext(UserContext);
	const userTeam = useQuery('Teams').filtered(`user_id == '${userId}'`)[0];
	const { colors } = useContext(ThemeContext);

	const revert = () => {
		setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : currentIndex);
	};

	return (
		<View style={{ flex: 1, backgroundColor: colors.PrimaryBackground, position: 'relative' }}>
			<View style={{ height: 40 }} />

			{userTeam === undefined && (
				<View style={{ zIndex: 100, height: '100%', width: '100%', position: 'absolute' }}>
					<Details />
				</View>
			)}

			<Card setCurrentIndex={setCurrentIndex} currentIndex={currentIndex} />

			{currentIndex > 0 && userTeam?.players?.length > 0 && currentIndex == userTeam.players.length && (
				<View style={{ flex: 1 }}>
					<Text style={{ textAlign: 'center', color: colors.primary, fontSize: 24 }}>You are done for today!</Text>
				</View>
			)}

			{userTeam?.players?.length == 0 && (
				<View style={{ flex: 1 }}>
					<Text style={{ textAlign: 'center', color: colors.primary, fontSize: 24 }}>Add players to your team</Text>
				</View>
			)}

			<View
				style={{
					paddingLeft: 10,
					paddingRight: 10,
					alignItems: 'center',
				}}>
				{userTeam?.players?.length != 0 && <PrimaryBtn icon="undo" handlePress={revert} style={{ borderRadius: 20 }} />}
			</View>
			<View style={{ height: 20 }} />
		</View>
	);
};

export default Home;
