import { useContext, useEffect, useRef, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Headline, TextInput, Button } from 'react-native-paper';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from '../../context/context';
import { useRealm } from '../../models/Player';
import { useStore } from '../../store/store';
import ListItem from '../List/ListItem';
import ListSection from '../List/ListSection';
import PositionSelector from '../Modal/PositionSelector';
const Form = () => {
	// const user = useContext(UserContext);
	const realm = useRealm();
	const [name, setName] = useState('');
	const [value, setValue] = useState('Defender');
	const [players, setPlayers] = useState([]);

	useEffect(() => {
		(async () => {
			const players = realm.objects('player');
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

			// cleanup function
			return () => {
				// Remember to remove the listener when you're done!
				players.removeAllListeners();
				// Call the close() method when done with a realm instance to avoid memory leaks.
				realm.close();
			};
		})();
	}, []);
	console.log(players);

	const addPlayerToRealm = () => {
		realm.write(() => {
			realm.create('player', {
				_id: new Realm.BSON.ObjectId(),
				name: name,
				position: value,
				uri: '/assets/images/player1.jpg',
			});
		});
	};

	return (
		<ScrollView>
			<Headline
				style={{
					textAlign: 'center',
					marginBottom: 10,
				}}>
				Team
			</Headline>
			<TextInput label="Add Team Member" onChangeText={value => setName(value)} value={name} placeholder="type name" />

			<View style={{ zIndex: 100 }}>
				<PositionSelector onValueChange={value => setValue(value)} value={value} />
			</View>

			<Button
				onPress={() => {
					if (name.length > 0) {
						// addPlayer(name, value);
						addPlayerToRealm();
						setName('');
					}
				}}>
				Add
			</Button>

			<View>
				<ListSection>
					{players?.map(player => (
						<ListItem
							key={uuidv4 + Math.random()}
							name={player.name}
							player={player}
							position={player.position}
							src={player.uri}
						/>
					))}
				</ListSection>
			</View>
		</ScrollView>
	);
};

export default Form;
