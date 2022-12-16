import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { Checkbox, Divider, Headline } from 'react-native-paper';
import { ThemeContext, UserContext } from '../context/context';
import { useApp } from '@realm/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PrimaryBtn from '../components/PrimaryBtn/PrimaryBtn';

const Settings = () => {
	const { colors, toggleTheme, isThemeDark } = useContext(ThemeContext);
	const [checked, setChecked] = useState(isThemeDark);

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
		<View style={{ flex: 1, paddingTop: 60, backgroundColor: colors.PrimaryBackground }}>
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					paddingLeft: 20,
					paddingRight: 20,
				}}>
				<Headline style={{ color: colors.primary, fontWeight: 'bold' }}>Settings</Headline>

				<Checkbox.Item
					label="Dark mode"
					status={checked ? 'checked' : 'unchecked'}
					labelStyle={{ color: colors.primary }}
					onPress={() => {
						setChecked(!checked);
						toggleTheme();
					}}
				/>
				<Divider />

				<PrimaryBtn
					handlePress={logoutUser}
					content="Log out"
					style={{ width: '100%', position: 'absolute', bottom: 10, backgroundColor: colors.warning }}
				/>
				{/* <PrimaryBtn handlePress={toggleTheme} content="Change theme" style={{ width: '100%', marginTop: 20 }} /> */}
			</View>
		</View>
	);
};

export default Settings;
