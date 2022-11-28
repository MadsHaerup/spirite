import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { Realm } from '@realm/react';
import { PlayerSchema, TeamsSchema } from '../models/Player';
import { UserContext } from '../context/context';

const LoginPage = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const theme = useTheme();
	const { userId, setUserId } = useContext(UserContext);
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
							// Create an email/password credential
							const credentials = Realm.Credentials.emailPassword(email, password);

							try {
								const user = await app.logIn(credentials);
								console.log('Successfully logged in! yes', user.id);
								setUserId(user.id);

								const realm = await Realm.open({
									schema: [PlayerSchema, TeamsSchema],
									sync: { user: app.currentUser, flexible: true },
								});
								const teams = realm.objects('Teams');
								const player = realm.objects('Player');

								await realm.subscriptions.update(mutableSubs => {
									mutableSubs.add(teams);
									mutableSubs.add(player);
								});
								console.log(realm.subscriptions.state); // log the subscription state

								navigation.navigate('Swipe');
							} catch (err) {
								console.error('Failed to log in', err.message);
							}
						}}>
						Login
					</Button>
					<Text style={{ color: theme.colors.primary }} onPress={() => navigation.navigate('RegisterPage')}>
						Go to register
					</Text>
				</View>
			</View>
		</View>
	);
};

export default LoginPage;
