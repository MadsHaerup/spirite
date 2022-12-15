import React, { useContext, useState } from 'react';
import { ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { ThemeContext, UserContext } from '../../context/context';
import { useQuery } from '../../context/realmContext';

const ListOfPlayers = ({ player, onChange }) => {
	const { colors } = useContext(ThemeContext);
	const { userId } = useContext(UserContext);
	const team = useQuery('Teams').filtered(`user_id == '${userId}'`)[0];
	const players = team?.players;
	const [selectedPlayer, setSelectedPlayer] = useState(player.name);
	return (
		<ScrollView style={{ width: '100%', marginBottom: 20 }}>
			<RadioButton.Group
				value={selectedPlayer}
				onValueChange={name => {
					setSelectedPlayer(name),
						onChange({
							...player,
							name: name,
						});
				}}>
				{players.map(player => (
					<RadioButton.Item
						key={player._id}
						labelStyle={{ color: colors.primary }}
						label={player.name}
						value={player.name}
					/>
				))}
			</RadioButton.Group>
		</ScrollView>
	);
};

export default ListOfPlayers;
