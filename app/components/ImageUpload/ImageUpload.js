import React, { useContext } from 'react';
import { View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper';
import { ThemeContext } from '../../context/context';

const ImageUpload = ({ setSelectedImage, style }) => {
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
		<View style={{ textAlign: 'center', justifyContent: 'center' }}>
			<Button
				color={`${colors?.buttonContent}`}
				style={{ ...style, backgroundColor: colors?.button, alignSelf: 'center' }}
				mode="text"
				onPress={pickImageAsync}>
				Photo
			</Button>
		</View>
	);
};

export default ImageUpload;
