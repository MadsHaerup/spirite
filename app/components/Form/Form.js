import { useContext, useEffect, useRef, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Headline, TextInput, Button, Portal, Provider } from 'react-native-paper';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from '../../context/context';
import { useRealm } from '../../models/Player';
import { useStore } from '../../store/store';
import ListItem from '../List/ListItem';
import ListSection from '../List/ListSection';
import PositionSelector from '../Modal/PositionSelector';
const Form = () => {
	const [name, setName] = useState('');
	// const teamMembes = useStore(state => state.players);
	const addPlayer = useStore(state => state.addPlayer);
	const playerRef = useRef(useStore.getState().players);
	// console.log(teamMembes);
	const [teamMembers, setTeamMembers] = useState([]);
	const user = useContext(UserContext);

	useEffect(() => {
		const getPlayers = async () => {
			const getAllPlayers = await user.functions.getAllPlayers();
			setTeamMembers(getAllPlayers);
		};
		getPlayers();
	}, []);

	console.log('TEAM', teamMembers);

	const [value, setValue] = useState('Defender');
	const realm = useRealm();

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

	useEffect(
		() =>
			useStore.subscribe(
				players => (playerRef.current = players),
				state => state.players
			),
		[]
	);

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
						addPlayer(name, value);
						addPlayerToRealm();
						setName('');
					}
				}}>
				Add
			</Button>

			<View>
				<ListSection>
					{teamMembers?.map(member => (
						<ListItem key={uuidv4 + Math.random()} name={member.name} position={member.position} src={member.uri} />
					))}
				</ListSection>
			</View>
		</ScrollView>
	);
};

export default Form;
