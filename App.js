import { NavigationContainer } from '@react-navigation/native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Tabs from './app/components/Tabs/Tabs';
import { ThemeContext, UserContext } from './app/context/context';
import { AppProvider, UserProvider } from '@realm/react';
import AccountTabs from './app/components/Tabs/AccountTabs';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from 'sentry-expo';
import { APP_ID, SENTRY_DSN } from '@env';
import { ErrorBoundary } from './app/components/ErrorBoundary/ErrorBoundary';
import Login from './app/views/Login';
import { RealmProvider } from './app/context/realmContext';

Sentry.init({
	dsn: SENTRY_DSN,
	enableInExpoDevelopment: true,
	debug: false, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

function App() {
	const lightTheme = {
		colors: {
			light: '#fff',
			primary: '#fff',
			secondary: '#455763',
			PrimaryBackground: '#fff',
			secondaryBackground: '#00674A',
			inactive: '#455763',
			iconColor: '#061721',
			icons: '#08D05B',
			edit: '#00674A',
			succes: '#08D05B',
			button: '#08D05B',
			delete: '#FF9999',
			error: '#FF9999',
			outline: '#B2FF00',
			field: '#1C2D38',
		},
	};
	const darkTheme = {
		colors: {
			dark: '#000',
			primary: '#fff',
			secondary: '#455763',
			PrimaryBackground: '#011E2B',
			secondaryBackground: '#00674A',
			inactive: '#455763',
			iconColor: '#061721',
			icons: '#08D05B',
			edit: '#00674A',
			succes: '#08D05B',
			button: '#08D05B',
			delete: '#FF9999',
			error: '#FF9999',
			outline: '#B2FF00',
			field: '#1C2D38',
		},
	};
	const [isThemeDark, setIsThemeDark] = useState(true);
	let theme = isThemeDark ? darkTheme : lightTheme;

	const toggleTheme = useCallback(() => {
		return setIsThemeDark(!isThemeDark);
	}, [isThemeDark]);

	const themeSettings = useMemo(
		() => ({
			toggleTheme,
			colors: theme.colors,
		}),
		[toggleTheme, theme]
	);

	const [userId, setUserId] = useState('');
	const [loggedIn, setLoggedIn] = useState('');
	const value = useMemo(() => ({ userId, setUserId, loggedIn }), [userId, loggedIn]);

	const getUser = async () => {
		try {
			const userData = JSON.parse(await AsyncStorage.getItem('user'));
			if (value !== null) {
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

	return (
		<ErrorBoundary>
			<ThemeContext.Provider value={themeSettings}>
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
			</ThemeContext.Provider>
		</ErrorBoundary>
	);
}

export default Sentry.Native.wrap(App);
