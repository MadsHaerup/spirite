import { useContext, useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Headline } from 'react-native-paper';
import { ThemeContext, UserContext } from '../../context/context';
import { useQuery, useRealm } from '../../models/Player';
import { Realm } from '@realm/react';
import ListItem from '../List/ListItem';
import ListSection from '../List/ListSection';
import Edit from '../Modal/Edit';

const TeamList = ({ setVisible, setPlayerId }) => {
	const { UUID } = Realm.BSON;
	const realm = useRealm();
	const [players, setPlayers] = useState([]);
	const { userId } = useContext(UserContext);
	const team = useQuery('Teams').filtered(`user_id == '${userId}'`)[0];
	const { colors } = useContext(ThemeContext);

	useEffect(() => {
		(async () => {
			const players = team.players;
			// set state to the initial value of your realm objects
			setPlayers([...players]);

			try {
				players.addListener(() => {
					// update state of players to the updated value
					setPlayers([...players]);
				});
			} catch (error) {
				console.error(
					`Unable to update the players' state, an exception was thrown within the change listener: ${error}`
				);
			}
		})();
	}, []);

	return (
		<ScrollView>
			<Headline
				style={{
					textAlign: 'center',
					marginBottom: 10,
					paddingTop: 50,
					color: colors.primary,
					fontWeight: 'bold',
				}}>
				{team.team_name}
			</Headline>

			<View>
				<ListSection>
					{players?.map(player => (
						<ListItem
							setPlayerId={setPlayerId}
							setVisible={setVisible}
							key={new UUID()}
							name={player.name}
							age={player.age}
							id={player._id}
							position={player.position}
							src={player.uri}
						/>
					))}
				</ListSection>
			</View>
		</ScrollView>
	);
};

export default TeamList;
