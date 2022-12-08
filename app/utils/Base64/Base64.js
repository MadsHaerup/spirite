import ImgToBase64 from 'react-native-image-base64-png';

export const base64 = (file, setBase64Image) => {
	ImgToBase64.getBase64String(file)
		.then(base64String => setBase64Image(base64String))
		.catch(err => console.log(err));
};
