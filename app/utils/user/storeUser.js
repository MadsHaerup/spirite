import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUser = async value => {
	try {
		await AsyncStorage.setItem('user', JSON.stringify(value));
	} catch (error) {
		console.log(error);
	}
};
