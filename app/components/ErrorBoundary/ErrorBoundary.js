import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import PrimaryBtn from '../PrimaryBtn/PrimaryBtn';

export class ErrorBoundary extends React.Component {
	state = {
		error: false,
	};

	static getDerivedStateFromError(error) {
		return { error: true };
	}

	componentDidCatch(error, errorInfo) {
		// deal with errorInfo if needed
	}

	destroyAuthToken = async () => {
		await AsyncStorage.removeItem('user');
	};

	handleBackToSignIn = async () => {
		// remove user settings
		await this.destroyAuthToken();
		// restart app
		RNRestart.Restart();
	};

	render() {
		if (this.state.error) {
			return (
				<SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: '#011E2B', color: '#fff' }}>
					<View style={{ padding: 20 }}>
						<Text style={{ fontSize: 24, color: '#fff', marginBottom: 20, textAlign: 'center' }}>
							Oops, Something Went Wrong
						</Text>
						<Text style={{ marginVertical: 10, lineHeight: 23, fontWeight: '500', color: '#fff', textAlign: 'center' }}>
							The app ran into a problem and could not continue. We apologise for any inconvenience this has caused!
							Press the button below to restart the app and sign back in. Please contact us if this issue persists.
						</Text>

						<PrimaryBtn
							icon="login"
							handlePress={this.handleBackToSignIn}
							style={{ marginVertical: 15 }}
							content="Back to Sign In Screen"
						/>
					</View>
				</SafeAreaView>
			);
		} else {
			return this.props.children;
		}
	}
}

export default ErrorBoundary;
