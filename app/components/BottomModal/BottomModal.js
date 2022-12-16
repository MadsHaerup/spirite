import React, { forwardRef, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Fab from '../Fab/Fab';
import { ThemeContext, UserContext } from '../../context/context';
import { FAB, TextInput, HelperText, Button, IconButton } from 'react-native-paper';
import { showToast } from '../../utils/Toast/showToast';
import PositionSelector from '../Modal/PositionSelector';
import ImageUpload from '../ImageUpload/ImageUpload';
import ImgToBase64 from 'react-native-image-base64-png';
import { numberValidation } from '../../utils/validation/numberValidation';
import RealmAddPlayer from '../../utils/Realm/RealmAddPlayer';
import { useQuery, useRealm } from '../../context/realmContext';
import PrimaryBtn from '../PrimaryBtn/PrimaryBtn';

const BottomModal = forwardRef((props, ref) => {
	const realm = useRealm();
	const { userId } = useContext(UserContext);
	const team = useQuery('Teams').filtered(`user_id == '${userId}'`)[0];
	const [base64Image, setBase64Image] = useState();
	const [name, setName] = useState('');
	const [age, setAge] = useState('');
	const [position, setPosition] = useState('');
	const [selectedImage, setSelectedImage] = useState(null);
	const { colors } = useContext(ThemeContext);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const snapPoints = useMemo(() => ['25%', '50%'], []);
	const showDialog = () => setIsDialogOpen(true);

	//transform image to base64 string
	ImgToBase64.getBase64String(selectedImage)
		.then(base64String => setBase64Image(base64String))
		.catch(err => console.log(err));
	// ref
	const bottomSheetModalRef = useRef(ref);
	const refToTextInput = useRef(null);
	// callbacks
	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);
	const handleSheetChanges = useCallback(index => {
		refToTextInput.current?.focus();
	}, []);

	const resetFields = () => {
		setName('');
		setSelectedImage(null);
		setPosition('');
		setAge('');
	};

	const verified = () => {
		return name.length > 0 && age.length > 0 && numberValidation(age) == false && position != '';
	};

	// renders
	return (
		<BottomSheetModalProvider>
			<View>
				<Fab
					handlePress={handlePresentModalPress}
					label="ADD"
					icon="plus"
					style={{ backgroundColor: colors.button, bottom: 8, right: 8 }}
				/>
				<BottomSheetModal ref={bottomSheetModalRef} index={1} snapPoints={snapPoints} onChange={handleSheetChanges}>
					<View style={{ flex: 1 }}>
						<Text
							style={{
								textAlign: 'center',
								paddingTop: 10,
								paddingBottom: 10,
								fontSize: 24,
								fontWeight: 'bold',
								marginTop: 20,
								marginBottom: 20,
							}}>
							Add to team
						</Text>
						<TextInput
							ref={refToTextInput}
							label="Name"
							onChangeText={value => setName(value)}
							activeUnderlineColor={colors.icons}
							value={name}
							style={{ backgroundColor: '#fff', marginBottom: 20 }}
							placeholder="type name"
						/>
						<TextInput
							label="Age"
							keyboardType="numeric"
							onChangeText={value => setAge(value)}
							activeUnderlineColor={colors.icons}
							value={age}
							style={{ backgroundColor: '#fff' }}
							placeholder="type age"
						/>
						<HelperText type="error" visible={numberValidation(age) == undefined ? null : numberValidation(age)}>
							Only Use Numbers.
						</HelperText>

						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-evenly',
								alignItems: 'center',
								marginBottom: 20,
								marginTop: 20,
							}}>
							<ImageUpload selectedImage={selectedImage} setSelectedImage={setSelectedImage} style={{ width: 150 }} />

							<PrimaryBtn content="position" handlePress={showDialog} style={{ width: 150 }} />
							<IconButton
								icon={verified() == true ? 'send' : 'cancel'}
								animated="true"
								size={24}
								onPress={() => {
									if (verified() == true) {
										RealmAddPlayer({
											realm: realm,
											team: team,
											objectId: new Realm.BSON.ObjectId(),
											name: name,
											position: position,
											base64Image: base64Image,
											age: age,
										});
										resetFields();
										showToast({ type: 'success', title: 'Succes', body: 'Player has been added to the list 👋' });
									}
								}}
							/>
						</View>

						<PositionSelector
							isDialogOpen={isDialogOpen}
							setIsDialogOpen={setIsDialogOpen}
							onValueChange={value => setPosition(value)}
							position={position}
							style={{ width: 200 }}
						/>
					</View>
				</BottomSheetModal>
			</View>
		</BottomSheetModalProvider>
	);
});

export default BottomModal;
