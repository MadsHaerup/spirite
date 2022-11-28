import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput, useTheme, Text } from 'react-native-paper';
import { Realm } from '@realm/react';

const RegisterPage = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const theme = useTheme();
	const app = new Realm.App({ id: 'footieswipe-realm-nhnvh' });

	return (
		<View style={{ flex: 1, backgroundColor: theme.colors.background, justifyContent: 'center' }}>
			<View style={{ padding: 20 }}>
				<TextInput
					style={{ marginBottom: 20 }}
					mode="outlined"
					label="Email"
					value={email}
					onChangeText={email => setEmail(email)}
				/>

				<TextInput
					secureTextEntry
					right={<TextInput.Icon icon="eye" />}
					mode="outlined"
					label="Password"
					value={password}
					onChangeText={password => setPassword(password)}
				/>

				<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
					<Button
						style={{ margin: 10, width: 120 }}
						mode="contained"
						onPress={async () => {
							try {
								app.emailPasswordAuth.registerUser({ email, password });
								navigation.navigate('LoginPage');
							} catch (error) {
								console.log(error);
							}
						}}>
						Register
					</Button>
					<Text style={{ color: theme.colors.primary }} onPress={() => navigation.navigate('LoginPage')}>
						Go to login
					</Text>
				</View>
			</View>
		</View>
	);
};

export default RegisterPage;
