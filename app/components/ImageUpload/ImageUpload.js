import React, { useContext } from 'react';
import { View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper';
import { ThemeContext } from '../../context/context';

const ImageUpload = ({ selectedImage, setSelectedImage }) => {
	const { colors } = useContext(ThemeContext);
	const pickImageAsync = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			quality: 1,
		});

		if (!result.canceled) {
			setSelectedImage(result.assets[0].uri);
		} else {
			alert('You did not select any image.');
		}
	};

	return (
		<View style={{ marginTop: 30, textAlign: 'center', justifyContent: 'center' }}>
			<Button
				color={`${colors.primary}`}
				style={{ backgroundColor: colors.icons, width: 200, alignSelf: 'center' }}
				mode="text"
				onPress={pickImageAsync}>
				Choose a photo
			</Button>
		</View>
	);
};

export default ImageUpload;
