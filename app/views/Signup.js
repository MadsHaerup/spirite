import React, { useContext, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from 'react-native';
import { Button, TextInput, Text, HelperText } from 'react-native-paper';
import { Realm } from '@realm/react';
import { ThemeContext } from '../context/context';
import Logo from '../components/Logo/Logo';
import { APP_ID } from '@env';
import { validateEmail } from '../utils/validation/emailValidation';
import { validatePassword } from '../utils/validation/passwordValidation';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
	const navigation = useNavigation();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const app = new Realm.App({ id: APP_ID });
	const { colors, isThemeDark } = useContext(ThemeContext);
	const [secureTextEntry, setSecureTextEntry] = useState(true);

	return (
		<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={{ flex: 1, backgroundColor: colors?.PrimaryBackground, paddingTop: 80, justifyContent: 'center' }}>
					<Logo />
					<View style={{ padding: 20 }}>
						<TextInput
							outlineColor={`${colors?.primary}`}
							activeUnderlineColor={`${colors?.icons}`}
							style={{ marginBottom: 2, backgroundColor: isThemeDark ? colors?.primary : colors?.PrimaryBackground }}
							mode="flat"
							label="Email"
							value={email}
							onChangeText={email => setEmail(email)}
						/>
						<HelperText
							style={{ marginBottom: 10, color: colors?.warning }}
							type="error"
							visible={validateEmail(email) == false ? true : false}
						>
							Invalid Email.
						</HelperText>
						<TextInput
							secureTextEntry={secureTextEntry}
							editable={true}
							style={{ backgroundColor: isThemeDark ? colors?.primary : colors?.PrimaryBackground }}
							outlineColor={`${colors?.primary}`}
							activeUnderlineColor={`${colors?.icons}`}
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
							style={{ color: colors?.warning }}
							type="error"
							visible={validatePassword(password) == false ? true : false}
						>
							At least one uppercase letter, one lowercase letter, one number, and one special character.
						</HelperText>

						<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
							<Button
								disabled={validatePassword(password) == true && validateEmail(email) == true ? false : true}
								labelStyle={{ color: colors?.iconColor }}
								style={{
									margin: 10,
									width: 120,
									backgroundColor:
										validatePassword(password) == true && validateEmail(email) == true
											? colors?.button
											: colors?.warning,
									opacity: validatePassword(password) == true && validateEmail(email) == true ? 1 : 0.5,
								}}
								mode="contained"
								onPress={async () => {
									try {
										app.emailPasswordAuth.registerUser({ email, password });
										navigation.navigate('Login');
									} catch (error) {
										console.log(error);
									}
								}}
							>
								Sign up
							</Button>
							<Text style={{ color: colors?.primary, width: 100 }} onPress={() => navigation.navigate('Login')}>
								Go to login
							</Text>
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

export default SignUp;
