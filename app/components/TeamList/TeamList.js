import { useContext, useMemo, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Headline, TextInput } from 'react-native-paper';
import { ThemeContext, UserContext } from '../../context/context';
import { Realm } from '@realm/react';
import ListItem from '../List/ListItem';
import ListSection from '../List/ListSection';
import { useQuery } from '../../context/realmContext';

const TeamList = ({ setVisible, setPlayerId }) => {
	const [search, setSearch] = useState('');
	const { UUID } = Realm.BSON;
	const { userId } = useContext(UserContext);
	const team = useQuery('Teams').filtered(`user_id == '${userId}'`)[0];
	const { colors } = useContext(ThemeContext);

	const players = useMemo(() => {
		return team?.players.filter(player => {
			return player.name.toLowerCase().includes(search.toLowerCase());
		});
	}, [team?.players]);

	return (
		<ScrollView>
			<Headline
				style={{
					textAlign: 'center',
					marginBottom: 20,
					color: colors?.primary,
					fontWeight: 'bold',
				}}>
				{team?.team_name}
			</Headline>

			<View>
				<TextInput
					underlineColor="#1C2D38"
					activeUnderlineColor="#1C2D38"
					label="Search for a player"
					value={search}
					onChangeText={text => setSearch(text)}
					style={{
						marginTop: 0,
						marginBottom: 10,
						marginHorizontal: 20,
						height: 50,
					}}
				/>
				<ListSection>
					{players?.map(player => (
						<ListItem
							setPlayerId={setPlayerId}
							setVisible={setVisible}
							key={new UUID()}
							name={player?.name}
							age={player?.age}
							id={player?._id}
							position={player?.position}
							src={player?.uri}
							events={player.events}
						/>
					))}
				</ListSection>
			</View>
		</ScrollView>
	);
};

export default TeamList;
