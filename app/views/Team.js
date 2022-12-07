import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { FAB, TextInput, HelperText } from 'react-native-paper';
import BottomModal from '../components/BottomModal/BottomModal';
import ImageUpload from '../components/ImageUpload/ImageUpload';
import PositionSelector from '../components/Modal/PositionSelector';
import { ThemeContext, UserContext } from '../context/context';
import { useQuery, useRealm } from '../models/Player';
import ImgToBase64 from 'react-native-image-base64-png';
import TeamList from '../components/TeamList/TeamList';
import Edit from '../components/Modal/Edit';
import { showToast } from '../utils/Toast/showToast';

const Team = () => {
	const realm = useRealm();
	const [name, setName] = useState('');
	const [age, setAge] = useState('');
	const [position, setPosition] = useState('');
	const [selectedImage, setSelectedImage] = useState(null);
	const { userId } = useContext(UserContext);
	const team = useQuery('Teams').filtered(`user_id == '${userId}'`)[0];
	const [base64Image, setBase64Image] = useState(null);
	const { colors } = useContext(ThemeContext);
	const ageNumber = Number(age);
	const [visible, setVisible] = useState(false);
	const [playerId, setPlayerId] = useState(null);

	ImgToBase64.getBase64String(selectedImage)
		.then(base64String => setBase64Image(base64String))
		.catch(err => console.log(err));

	const addPlayerToRealm = () => {
		realm.write(() => {
			team.players.push(
				realm.create('Player', {
					_id: new Realm.BSON.ObjectId(),
					name: name,
					position: position,
					team_name: team.team_name,
					uri: base64Image,
					age: ageNumber,
				})
			);
		});
	};

	const hasErrors = () => {
		if (age.length > 0) {
			let isnum = !/^\d+$/.test(age);
			return isnum;
		}
	};

	const resetFields = () => {
		setName('');
		setSelectedImage(null);
		setPosition('');
		setAge('');
	};

	const verified = () => {
		return name.length > 0 && age.length > 0 && hasErrors() == false && position != '';
	};
	return (
		<View style={{ flex: 1, backgroundColor: colors.PrimaryBackground, position: 'relative' }}>
			<TeamList setVisible={setVisible} setPlayerId={setPlayerId} />

			<BottomModal>
				<TextInput
					label="Name"
					onChangeText={value => setName(value)}
					activeUnderlineColor={colors.icons}
					value={name}
					style={{ backgroundColor: colors.primary }}
					placeholder="type name"
				/>
				<TextInput
					label="Age"
					keyboardType="numeric"
					onChangeText={value => setAge(value)}
					activeUnderlineColor={colors.icons}
					value={age}
					style={{ backgroundColor: colors.primary }}
					placeholder="type age"
				/>
				<HelperText type="error" visible={hasErrors() == undefined ? null : hasErrors()}>
					Only Use Numbers.
				</HelperText>

				<FAB
					icon={verified() == true ? 'check' : 'alert-circle-outline'}
					onPress={() => {
						if (verified() == true) {
							addPlayerToRealm();
							resetFields();
							showToast({ type: 'success', title: 'Succes', body: 'Player has been added to the list 👋' });
						}
					}}
					visible="true"
					iconMode={'static'}
					style={
						verified() == true
							? { bottom: 16, right: 16, position: 'absolute', backgroundColor: colors.icons }
							: { bottom: 16, right: 16, position: 'absolute', backgroundColor: colors.error }
					}
					color={`${colors.primary}`}
				/>

				<ImageUpload
					selectedImage={selectedImage}
					setSelectedImage={setSelectedImage}
					style={{ width: 200, marginBottom: 20 }}
				/>
				<PositionSelector onValueChange={value => setPosition(value)} position={position} style={{ width: 200 }} />
			</BottomModal>

			{visible && (
				<View style={{ position: 'absolute', width: '100%', height: '100%' }}>
					<Edit visible={visible} setVisible={setVisible} id={playerId} />
				</View>
			)}
		</View>
	);
};

export default Team;
