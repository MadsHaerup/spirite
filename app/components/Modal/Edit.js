import React, { useContext, useState } from 'react';
import { Modal, Portal, Text, Button, Provider, TextInput, HelperText } from 'react-native-paper';
import { ThemeContext } from '../../context/context';
import { useRealm } from '../../models/Player';
import Fab from '../Fab/Fab';
import ImageUpload from '../ImageUpload/ImageUpload';
import PositionSelector from './PositionSelector';

const Edit = ({ visible, setVisible, id }) => {
	const [name, setName] = useState('');
	const [age, setAge] = useState('');
	const [position, setPosition] = useState('');
	const [selectedImage, setSelectedImage] = useState(null);
	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);
	const { colors } = useContext(ThemeContext);
	const realm = useRealm();
	const containerStyle = {
		backgroundColor: colors.PrimaryBackground,
		padding: 20,
		height: '60%',
		width: '100%',
		color: 'black',
	};

	const handlePress = () => {
		realm.write(() => {
			const player = realm.objectForPrimaryKey('Player', id);
			console.log(player);
			player.name = name;
			player.age = Number(age);
		});
	};

	return (
		<Provider>
			<Portal>
				<Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
					<TextInput
						label="Name"
						onChangeText={value => setName(value)}
						activeUnderlineColor={colors.icons}
						value={name}
						style={{ backgroundColor: colors.primary, color: colors.secondary, marginBottom: 10 }}
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
					{/* <HelperText type="error" visible={hasErrors() == undefined ? null : hasErrors()}>
						Only Use Numbers.
					</HelperText> */}
					<ImageUpload selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
					<PositionSelector onValueChange={value => setPosition(value)} position={position} />
					<Fab handlePress={handlePress} />
				</Modal>
			</Portal>
		</Provider>
	);
};

export default Edit;
