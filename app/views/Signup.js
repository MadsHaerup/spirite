import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput, useTheme, Text, HelperText } from 'react-native-paper';
import { Realm } from '@realm/react';
import { ThemeContext } from '../context/context';
import Logo from '../components/Logo/Logo';

const SignUp = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const app = new Realm.App({ id: 'footieswipe-realm-nhnvh' });
	const { colors } = useContext(ThemeContext);

	const validateEmail = () => {
		if (email.length > 0) {
			const re =
				/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(String(email).toLowerCase());
		}
	};
	const validatePassword = () => {
		// 	1. This code is a regular expression that checks if a string has at least one uppercase letter, one lowercase letter,
		// one number, and one special character.
		// 2. It also checks if the string is at least 6 characters long.
		if (password.length > 0) {
			const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
			return re.test(String(password).toLowerCase());
		}
	};

	return (
		<View style={{ flex: 1, backgroundColor: colors.PrimaryBackground, justifyContent: 'center' }}>
			<Logo />
			<View style={{ padding: 20 }}>
				<TextInput
					outlineColor={`${colors.primary}`}
					activeUnderlineColor={`${colors.icons}`}
					style={{ marginBottom: 2, backgroundColor: colors.primary }}
					mode="flat"
					label="Email"
					value={email}
					onChangeText={email => setEmail(email)}
				/>
				<HelperText
					style={{ marginBottom: 10, color: colors.error }}
					type="error"
					visible={validateEmail() == false ? true : false}>
					Invalid Email.
				</HelperText>
				<TextInput
					secureTextEntry
					style={{ backgroundColor: colors.primary }}
					outlineColor={`${colors.primary}`}
					activeUnderlineColor={`${colors.icons}`}
					right={<TextInput.Icon icon="eye" />}
					mode="flat"
					label="Password"
					value={password}
					onChangeText={password => setPassword(password)}
				/>
				<HelperText style={{ color: colors.error }} type="error" visible={validatePassword() == false ? true : false}>
					At least one uppercase letter, one lowercase letter, one number, and one special character.
				</HelperText>

				<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
					<Button
						disabled={validatePassword() == true && validateEmail() == true ? false : true}
						labelStyle={{ color: colors.iconColor }}
						style={{
							margin: 10,
							width: 120,
							backgroundColor: validatePassword() == true && validateEmail() == true ? colors.button : colors.error,
							opacity: validatePassword() == true && validateEmail() == true ? 1 : 0.7,
						}}
						mode="contained"
						onPress={async () => {
							try {
								app.emailPasswordAuth.registerUser({ email, password });
								navigation.navigate('Login');
							} catch (error) {
								console.log(error);
							}
						}}>
						Sign up
					</Button>
					<Text style={{ color: colors.primary, width: 100 }} onPress={() => navigation.navigate('Login')}>
						Go to login
					</Text>
				</View>
			</View>
		</View>
	);
};

export default SignUp;
