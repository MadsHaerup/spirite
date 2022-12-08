import Toast from 'react-native-toast-message';

export const showToast = ({ type, title, body } = {}) => {
	Toast.show({
		type: type,
		text1: title,
		text2: body,
	});
};
