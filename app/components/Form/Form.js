import { useContext, useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Headline, TextInput, Button } from 'react-native-paper';
import { UserContext } from '../../context/context';
import { useQuery, useRealm } from '../../models/Player';
import { Realm } from '@realm/react';
import { TeamContext } from '../../context/context';
import ListItem from '../List/ListItem';
import ListSection from '../List/ListSection';
import PositionSelector from '../Modal/PositionSelector';
import ImageUpload from '../ImageUpload/ImageUpload';
import ImgToBase64 from 'react-native-image-base64-png';

const Form = () => {
	const { UUID } = Realm.BSON;
	const realm = useRealm();
	const [name, setName] = useState('');
	const [value, setValue] = useState('Defender');
	const [players, setPlayers] = useState([]);
	const [selectedImage, setSelectedImage] = useState(null);
	const [base64Image, setBase64Image] = useState(null);
	const { userId } = useContext(UserContext);
	const team = useQuery('Teams').filtered(`user_id == '${userId}'`)[0];

	ImgToBase64.getBase64String(selectedImage)
		.then(base64String => setBase64Image(base64String))
		.catch(err => doSomethingWith(err));

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

	const addPlayerToRealm = () => {
		realm.write(() => {
			team.players.push(
				realm.create('Player', {
					_id: new Realm.BSON.ObjectId(),
					name: name,
					position: value,
					team_name: team.team_name,
					uri: base64Image,
				})
			);
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
			<ImageUpload selectedImage={selectedImage} setSelectedImage={setSelectedImage} />

			<Button
				style={{ width: 120, alignSelf: 'center' }}
				mode="contained"
				onPress={() => {
					if (name.length > 0) {
						addPlayerToRealm();
						setName('');
					}
				}}>
				Add
			</Button>

			<View>
				<ListSection>
					{players?.map(player => (
						<ListItem key={new UUID()} name={player.name} id={player._id} position={player.position} src={player.uri} />
					))}
				</ListSection>
			</View>
		</ScrollView>
	);
};

export default Form;
