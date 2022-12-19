import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput, HelperText } from 'react-native-paper';
import { Realm } from '@realm/react';
import { PlayerSchema, TeamsSchema, EventSchema } from '../models/model';
import { ThemeContext, UserContext } from '../context/context';
import Logo from '../components/Logo/Logo';
import { storeUser } from '../utils/user/storeUser';
import { validateEmail } from '../utils/validation/emailValidation';
import { validatePassword } from '../utils/validation/passwordValidation';
import { APP_ID } from '@env';

const Login = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { setUserId } = useContext(UserContext);
	const app = new Realm.App({ id: APP_ID });
	const { colors, setIsLoading } = useContext(ThemeContext);
	const [secureTextEntry, setSecureTextEntry] = useState(true);

	return (
		<View style={{ flex: 1, backgroundColor: colors.PrimaryBackground, paddingTop: 80 }}>
			<Logo />
			<View style={{ padding: 20 }}>
				<TextInput
					style={{ backgroundColor: colors.primary, marginBottom: 2 }}
					outlineColor={`${colors.primary}`}
					activeUnderlineColor={`${colors.icons}`}
					mode="flat"
					label="Email"
					value={email}
					onChangeText={email => setEmail(email)}
				/>
				<HelperText
					style={{ marginBottom: 10, color: colors.warning }}
					type="error"
					visible={validateEmail(email) == false ? true : false}>
					Invalid Email.
				</HelperText>

				<TextInput
					secureTextEntry={secureTextEntry}
					editable={true}
					style={{ backgroundColor: colors.primary }}
					outlineColor={`${colors.primary}`}
					activeUnderlineColor={`${colors.icons}`}
					mode="flat"
					label="Password"
					value={password}
					onChangeText={password => setPassword(password)}
					right={
						<TextInput.Icon
							icon={secureTextEntry ? 'eye' : 'eye-off'}
							onPress={() => setSecureTextEntry(!secureTextEntry)}
						/>
					}
				/>

				<HelperText
					style={{ color: colors.warning }}
					type="error"
					visible={validatePassword(password) == false ? true : false}>
					At least one uppercase letter, one lowercase letter, one number, and one special character.
				</HelperText>

				<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
					<Button
						// disabled={validatePassword(password) == true && validateEmail(email) == true ? false : true}
						labelStyle={{ color: colors.iconColor }}
						style={{
							margin: 10,
							width: 120,
							backgroundColor:
								validatePassword(password) == true && validateEmail(email) == true ? colors.button : colors.warning,
							opacity: validatePassword(password) == true && validateEmail(email) == true ? 1 : 0.5,
						}}
						mode="contained"
						onPress={async () => {
							// Create an email/password credential
							const credentials = Realm.Credentials.emailPassword(email, password);

							try {
								const user = await app.logIn(credentials);
								setIsLoading(true);
								console.log('Successfully logged in!', user.id);
								storeUser(user.id);
								setUserId(user.id);

								const realm = await Realm.open({
									schema: [PlayerSchema, TeamsSchema, EventSchema],
									sync: { user: app.currentUser, flexible: true },
								});
								const teams = realm.objects('Teams');
								const player = realm.objects('Player');
								const event = realm.objects('Event');

								await realm.subscriptions.update(mutableSubs => {
									mutableSubs.add(teams);
									mutableSubs.add(player);
									mutableSubs.add(event);
								});
								console.log(realm.subscriptions.state); // log the subscription state

								// navigation.navigate('Home');
							} catch (err) {
								console.error('Failed to log in', err.message);
							}
						}}>
						Login
					</Button>
					<Text style={{ color: colors.primary, width: 100 }} onPress={() => navigation.navigate('SignUp')}>
						Go to sign up
					</Text>
				</View>
			</View>
		</View>
	);
};

export default Login;
