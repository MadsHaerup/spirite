import React, { useContext } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { ThemeContext, UserContext } from '../context/context';
import { useApp } from '@realm/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PrimaryBtn from '../components/PrimaryBtn/PrimaryBtn';

const Settings = () => {
	const { colors, toggleTheme } = useContext(ThemeContext);
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
		<View
			style={{
				flex: 1,
				backgroundColor: colors.PrimaryBackground,
				justifyContent: 'center',
				paddingLeft: 20,
				paddingRight: 20,
			}}>
			<PrimaryBtn handlePress={logoutUser} content="Log out" style={{ width: '100%' }} />
			<PrimaryBtn handlePress={toggleTheme} content="Change theme" style={{ width: '100%', marginTop: 20 }} />
		</View>
	);
};

export default Settings;
