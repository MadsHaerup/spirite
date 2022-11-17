import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
// import logo from './assets/icon.png';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import * as ImageManipulator from 'expo-image-manipulator';
import Button from '../components/Button/Button';
const ImageShare = () => {
	const [selectedImage, setSelectedImage] = useState(null);

	const openImagePicker = async () => {
		let pickerResult = await ImagePicker.launchImageLibraryAsync();
		if (pickerResult.cancelled === true) return;
		setSelectedImage({ localUri: pickerResult.uri });
	};

	let openShareDialogAsync = async () => {
		if (Platform.OS === 'web') {
			alert(`Uh oh, sharing isn't available on your platform`);
			return;
		}
		const imageTmp = await ImageManipulator.manipulateAsync(selectedImage.localUri);
		await Sharing.shareAsync(imageTmp.uri);
	};

	const clearPickedImage = () => setSelectedImage(null);

	if (selectedImage !== null) {
		const ButtonProps = {
			text: 'Clear Image',
			fn: clearPickedImage,
			btnStyle: styles.button,
			btnTextStyle: styles.buttonText,
		};
		return (
			<View style={styles.container}>
				<Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail} />

				<TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
					<Text style={styles.buttonText}>Share this photo</Text>
				</TouchableOpacity>
				<Button {...ButtonProps} />
			</View>
		);
	}
	return (
		<View style={styles.container}>
			<Image source={{ uri: 'https://i.imgur.com/TkIrScD.png' }} style={styles.logo} />
			<Text style={styles.text}>To share a photo from your phone with a friend, just press the button below!</Text>

			<TouchableOpacity style={styles.button} onPress={openImagePicker}>
				<Text style={styles.buttonText}>Pick a Photo</Text>
			</TouchableOpacity>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f0f0f0',
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		color: '#888',
		fontSize: 18,
		marginHorizontal: 15,
	},
	logo: {
		width: 305,
		height: 159,
		marginBottom: 10,
	},
	button: {
		backgroundColor: 'blue',
		padding: 20,
		margin: 20,
		borderRadius: 5,
	},
	buttonText: {
		fontSize: 20,
		color: '#fff',
	},
	thumbnail: {
		width: 300,
		height: 300,
		resizeMode: 'contain',
	},
});

export default ImageShare;
