import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { Modal, Portal, Text, Button, Provider, TextInput, HelperText } from 'react-native-paper';
import { ThemeContext } from '../../context/context';
import { useRealm } from '../../models/Player';
import ImageUpload from '../ImageUpload/ImageUpload';
import PositionSelector from './PositionSelector';

const Edit = ({ visible, setVisible, id }) => {
	const realm = useRealm();

	const player = realm.objectForPrimaryKey('Player', id);
	const [name, setName] = useState(player.name);
	const [age, setAge] = useState(player.age.toString());
	const [position, setPosition] = useState(player.position);
	const [selectedImage, setSelectedImage] = useState(player.uri);
	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);
	const { colors } = useContext(ThemeContext);
	const containerStyle = {
		backgroundColor: colors.PrimaryBackground,
		padding: 20,
		borderRadius: 20,
		marginLeft: 10,
		marginRight: 10,
		borderColor: colors.icons,
		borderWidth: 1,
		height: '70%',
	};

	const handlePress = () => {
		realm.write(() => {
			player._id = id;
			player.name = name;
			player.age = Number(age);
			player.uri = selectedImage;
		});
		hideModal();
	};

	const hasErrors = () => {
		if (age.length > 0) {
			let isnum = !/^\d+$/.test(age);
			return isnum;
		}
	};

	return (
		<Provider>
			<Portal>
				<Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
					<Text style={{ textAlign: 'center', fontSize: 24, fontWeight: '600', padding: 20, color: colors.icons }}>
						Edit Player
					</Text>
					<TextInput
						label="Name"
						onChangeText={value => setName(value)}
						activeUnderlineColor={colors.icons}
						value={name}
						style={{ backgroundColor: colors.secondary, marginBottom: 20 }}
						placeholder="type name"
					/>
					<TextInput
						label="Age"
						keyboardType="numeric"
						onChangeText={value => setAge(value)}
						activeUnderlineColor={colors.icons}
						value={age}
						style={{ backgroundColor: colors.secondary }}
						placeholder="type age"
					/>
					<HelperText type="error" visible={hasErrors() == undefined ? null : hasErrors()}>
						Only Use Numbers.
					</HelperText>

					<View style={{ width: '100%', marginBottom: 20, marginTop: 0 }}>
						<ImageUpload selectedImage={selectedImage} setSelectedImage={setSelectedImage} style={{ width: '100%' }} />
					</View>
					<PositionSelector onValueChange={value => setPosition(value)} position={position} style={{ width: '100%' }} />

					<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', flex: 1 }}>
						<Button
							dark="true"
							style={{
								width: 120,
								borderColor: colors.error,
								color: colors.secondary,
							}}
							color={`${colors.error}`}
							mode="outlined"
							onPress={() => hideModal()}>
							Cancel
						</Button>
						<Button
							dark="true"
							style={{
								width: 120,
								borderColor: colors.button,
								color: colors.secondary,
							}}
							color={`${colors.primary}`}
							mode="outlined"
							onPress={() => handlePress()}>
							Submit
						</Button>
					</View>
				</Modal>
			</Portal>
		</Provider>
	);
};

export default Edit;
