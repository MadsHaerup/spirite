import React, { useContext } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { ThemeContext, UserContext } from '../context/context';
import { useApp } from '@realm/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logout = () => {
	const { colors } = useContext(ThemeContext);
	const app = useApp();
	const { setUserId } = useContext(UserContext);
	const logoutUser = () => {
		try {
			AsyncStorage.removeItem('user').then(() => {
				app.currentUser.logOut().then(() => {
					setUserId('');
				});
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={{ flex: 1, backgroundColor: colors.PrimaryBackground, justifyContent: 'center' }}>
			<Button
				style={{ backgroundColor: colors.button, marginLeft: 20, marginRight: 20 }}
				mode="contained"
				dark="true"
				contentStyle={{ color: 'black' }}
				onPress={() => logoutUser()}>
				Log out
			</Button>
		</View>
	);
};

export default Logout;
