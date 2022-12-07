import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import Tabs from './app/components/Tabs/Tabs';
import { RealmProvider } from './app/models/Player';
import { UserContext } from './app/context/context';
import { AppProvider, UserProvider } from '@realm/react';
import AccountTabs from './app/components/Tabs/AccountTabs';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from 'sentry-expo';
import { APP_ID, SENTRY_DSN } from '@env';
import { ErrorBoundary } from './app/components/ErrorBoundary/ErrorBoundary';
import Login from './app/views/Login';

Sentry.init({
	dsn: SENTRY_DSN,
	enableInExpoDevelopment: true,
	debug: false, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

function App() {
	const [userId, setUserId] = useState('');
	const [loggedIn, setLoggedIn] = useState('');
	const value = useMemo(() => ({ userId, setUserId, loggedIn }), [userId, loggedIn]);

	const getUser = async () => {
		try {
			const userData = JSON.parse(await AsyncStorage.getItem('user'));
			if (value !== null) {
				console.log(userData, 'data');
				setLoggedIn(userData);
				setUserId(userData);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getUser();
	}, [loggedIn, userId]);

	console.log(loggedIn, 'logged');

	return (
		<ErrorBoundary>
			<AppProvider id={APP_ID}>
				<StatusBar style="light" />

				{!loggedIn && (
					<UserContext.Provider value={value}>
						<NavigationContainer>
							<AccountTabs />
						</NavigationContainer>
					</UserContext.Provider>
				)}

				{loggedIn && (
					<UserProvider fallback={Login}>
						<UserContext.Provider value={value}>
							<RealmProvider sync={{ flexible: true }}>
								<NavigationContainer>
									<Tabs />
									<Toast />
								</NavigationContainer>
							</RealmProvider>
						</UserContext.Provider>
					</UserProvider>
				)}
			</AppProvider>
		</ErrorBoundary>
	);
}

export default Sentry.Native.wrap(App);
