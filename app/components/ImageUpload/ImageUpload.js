import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper';

const ImageUpload = ({ selectedImage, setSelectedImage }) => {
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
		<View style={styles.container}>
			<Button mode="text" onPress={pickImageAsync}>
				Choose a photo
			</Button>
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
});

export default ImageUpload;
