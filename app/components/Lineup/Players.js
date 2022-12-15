import { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import PlayerSelector from '../Modal/PlayerSelector';
import Player from './Player';

const Players = ({ players, onChangePlayer, selectedFormation }) => {
	const SCREEN_WIDTH = Dimensions.get('window').width;
	const SCREEN_HEIGHT = Dimensions.get('window').height;
	const [activePlayer, setActivePlayer] = useState('');
	const [isEditing, setIsEditing] = useState(false);
	const [strikers, setStrikers] = useState('');
	const [midfielders, setMidfielders] = useState('');

	useEffect(() => {
		const zone = selectedFormation.split('-');
		setStrikers(zone[2]);
		setMidfielders(zone[1]);
	}, [selectedFormation]);

	if (midfielders === '2' && strikers === '3') setMidfielders(5);
	if (midfielders === '3' && strikers === '3') setMidfielders(6);
	if (midfielders === '3' && strikers === '2') setMidfielders(5);
	if (midfielders === '4' && strikers === '3') setMidfielders(7);
	if (midfielders === '4' && strikers === '2') setMidfielders(6);
	if (midfielders === '4' && strikers === '1') setMidfielders(5);
	if (midfielders === '5' && strikers === '2') setMidfielders(7);
	if (midfielders === '5' && strikers === '1') setMidfielders(6);

	const zoneStyles = {
		position: 'absolute',
		width: '100%',
		overflow: 'hidden',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		zIndex: 100,
		alignItems: 'center',
		paddingTop: 5,
	};
	return (
		<View
			style={{
				width: SCREEN_WIDTH - 45,
				maxHeight: SCREEN_HEIGHT,
			}}>
			<View
				style={{
					...zoneStyles,
					top: 150,
					flex: 1,
				}}>
				{players.slice(0, strikers).map(player => (
					<Player
						key={player.id}
						player={player}
						onChange={onChangePlayer}
						setActivePlayer={setActivePlayer}
						setIsEditing={setIsEditing}
					/>
				))}
			</View>

			<View style={{ ...zoneStyles, top: 280 }}>
				{players.slice(strikers, midfielders).map((player, i) => (
					<Player
						key={player.id}
						player={player}
						onChange={onChangePlayer}
						setActivePlayer={setActivePlayer}
						setIsEditing={setIsEditing}
						i={i}
					/>
				))}
			</View>
			<View style={{ ...zoneStyles, top: 420 }}>
				{players.slice(midfielders, 10).map(player => (
					<Player
						key={player.id}
						player={player}
						onChange={onChangePlayer}
						setActivePlayer={setActivePlayer}
						setIsEditing={setIsEditing}
					/>
				))}
			</View>
			<View style={{ ...zoneStyles, top: 550 }}>
				{players.slice(10, 11).map(player => (
					<Player
						key={player.id}
						player={player}
						onChange={onChangePlayer}
						setActivePlayer={setActivePlayer}
						setIsEditing={setIsEditing}
					/>
				))}
			</View>

			{isEditing && (
				<View style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 100 }}>
					<PlayerSelector
						isEditing={isEditing}
						setIsEditing={setIsEditing}
						player={activePlayer}
						onChange={onChangePlayer}
					/>
				</View>
			)}
		</View>
	);
};

export default Players;
