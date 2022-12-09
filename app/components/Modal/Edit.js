import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { Modal, Portal, Text, Button, Provider, TextInput, HelperText } from 'react-native-paper';
import { ThemeContext } from '../../context/context';
import { useRealm } from '../../models/model';
import RealmEditPlayer from '../../utils/Realm/RealmEditPlayer';
import { numberValidation } from '../../utils/validation/numberValidation';
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
		borderRadius: 20,
		marginLeft: 10,
		marginRight: 10,
		borderColor: colors.icons,
		borderWidth: 1,
		height: '70%',
		position: 'relative',
	};

	return (
		<Provider>
			<Portal>
				<Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
					<View style={{ padding: 20, paddingBottom: 0 }}>
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
						<HelperText type="error" visible={numberValidation(age) == undefined ? null : numberValidation(age)}>
							Only Use Numbers.
						</HelperText>

						<View style={{ width: '100%', marginBottom: 20, marginTop: 0 }}>
							<ImageUpload
								selectedImage={selectedImage}
								setSelectedImage={setSelectedImage}
								style={{ width: '100%' }}
							/>
						</View>
					</View>

					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-around',
							flex: 1,
							position: 'absolute',
							bottom: 20,
							zIndex: 0,
							width: '100%',
						}}>
						<Button
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
							style={{
								width: 120,
								borderColor: colors.button,
								color: colors.secondary,
							}}
							color={`${colors.primary}`}
							mode="outlined"
							onPress={() => {
								RealmEditPlayer({ realm: realm, player: player, id: id, name: name, age: age, image: selectedImage }),
									hideModal();
							}}>
							Submit
						</Button>
					</View>
					<PositionSelector
						onValueChange={value => setPosition(value)}
						position={position}
						style={{ width: '100%', paddingLeft: 20, paddingRight: 20 }}
					/>
				</Modal>
			</Portal>
		</Provider>
	);
};

export default Edit;
