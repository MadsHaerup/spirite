import { useState } from 'react';
import { Dimensions, View } from 'react-native';
import PlayerSelector from '../Modal/PlayerSelector';
import Player from './Player';

const Players = ({ players, onChangePlayer }) => {
	const SCREEN_WIDTH = Dimensions.get('window').width;
	const SCREEN_HEIGHT = Dimensions.get('window').height;
	const [activePlayer, setActivePlayer] = useState({});
	const [isEditing, setIsEditing] = useState(false);

	const zoneStyles = {
		position: 'absolute',
		width: '100%',
		overflow: 'hidden',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		zIndex: 100,
	};

	return (
		<View
			style={{
				width: SCREEN_WIDTH - 50,
				maxHeight: SCREEN_HEIGHT,
				borderWidth: 2,
				borderColor: 'green',
			}}>
			<View
				style={{
					...zoneStyles,
					top: 160,
					flex: 1,
				}}>
				{players.slice(0, 2).map(player => (
					<Player
						key={player.id}
						player={player}
						onChange={onChangePlayer}
						setActivePlayer={setActivePlayer}
						setIsEditing={setIsEditing}
					/>
				))}
			</View>

			<View style={{ ...zoneStyles, top: 300 }}>
				{players.slice(2, 6).map(player => (
					<Player
						key={player.id}
						player={player}
						onChange={onChangePlayer}
						setActivePlayer={setActivePlayer}
						setIsEditing={setIsEditing}
					/>
				))}
			</View>
			<View style={{ ...zoneStyles, top: 450 }}>
				{players.slice(6, 10).map(player => (
					<Player
						key={player.id}
						player={player}
						onChange={onChangePlayer}
						setActivePlayer={setActivePlayer}
						setIsEditing={setIsEditing}
					/>
				))}
			</View>
			<View style={{ ...zoneStyles, top: 570 }}>
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
