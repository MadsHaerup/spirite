import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { Modal, Portal, Text, Button, Provider, TextInput, HelperText } from 'react-native-paper';
import { color } from 'react-native-reanimated';
import { ThemeContext } from '../../context/context';
import { useRealm } from '../../context/realmContext';
import RealmEditPlayer from '../../utils/Realm/RealmEditPlayer';
import { numberValidation } from '../../utils/validation/numberValidation';
import ImageUpload from '../ImageUpload/ImageUpload';
import PrimaryBtn from '../PrimaryBtn/PrimaryBtn';
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

	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const showDialog = () => setIsDialogOpen(true);

	const containerStyle = {
		backgroundColor: colors.PrimaryBackground,
		borderRadius: 20,
		marginLeft: 10,
		marginRight: 10,
		borderColor: colors.icons,
		borderWidth: 1,
		justifyContent: 'flex-start',
	};

	return (
		<Provider>
			<Portal>
				<Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
					<View style={{ padding: 20, paddingBottom: 20 }}>
						<Text style={{ textAlign: 'center', fontSize: 24, fontWeight: '600', padding: 20, color: colors.primary }}>
							Edit Player
						</Text>
						<TextInput
							mode="outlined"
							outlineColor={`${colors.secondary}`}
							theme={{ colors: { text: colors.primary, placeholder: colors.primary } }}
							label="Name"
							onChangeText={value => setName(value)}
							activeOutlineColor={colors.icons}
							value={name}
							style={{ backgroundColor: colors.PrimaryBackground, marginBottom: 20 }}
							placeholder="type name"
						/>
						<TextInput
							mode="outlined"
							theme={{ colors: { text: colors.primary, placeholder: colors.primary } }}
							outlineColor={`${colors.secondary}`}
							label="Age"
							keyboardType="numeric"
							onChangeText={value => setAge(value)}
							activeOutlineColor={colors.icons}
							value={age}
							style={{ backgroundColor: colors.PrimaryBackground }}
							placeholder="type age"
						/>
						<HelperText type="error" visible={numberValidation(age) == undefined ? null : numberValidation(age)}>
							Only Use Numbers.
						</HelperText>

						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}>
							<ImageUpload selectedImage={selectedImage} setSelectedImage={setSelectedImage} style={{ width: 150 }} />
							<PrimaryBtn
								style={{ backgroundColor: colors.button, width: 150 }}
								handlePress={showDialog}
								content="Position"
							/>
						</View>
					</View>

					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
							width: '100%',
							padding: 20,
							paddingTop: 0,
						}}>
						<Button
							style={{
								width: 150,
								borderColor: colors.warning,
								color: colors.secondary,
							}}
							color={`${colors.warning}`}
							mode="outlined"
							onPress={() => hideModal()}>
							Cancel
						</Button>
						<Button
							style={{
								width: 150,
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
						isDialogOpen={isDialogOpen}
						setIsDialogOpen={setIsDialogOpen}
						showDialog={showDialog}
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
