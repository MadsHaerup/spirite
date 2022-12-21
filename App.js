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
import { darkTheme, lightTheme } from './app/utils/data/theme';
import { View, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

Sentry.init({
	dsn: SENTRY_DSN,
	enableInExpoDevelopment: true,
	debug: false, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

const App = () => {
	const [isThemeDark, setIsThemeDark] = useState(true);
	const [userId, setUserId] = useState('');
	const [loggedIn, setLoggedIn] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const value = useMemo(() => ({ userId, setUserId, loggedIn }), [userId, loggedIn]);

	let theme = isThemeDark ? darkTheme : lightTheme;
	const getTheme = async () => {
		try {
			const themeData = JSON.parse(await AsyncStorage.getItem('theme'));
			if (themeData !== null) {
				setIsThemeDark(themeData);
			}
		} catch (error) {
			console.log(error);
		}
	};
	getTheme();

	const saveTheme = async value => {
		try {
			await AsyncStorage.setItem('theme', JSON.stringify(value));
		} catch (error) {
			console.log(error);
		}
	};

	const toggleTheme = useCallback(() => {
		setIsThemeDark(!isThemeDark);
		saveTheme(!isThemeDark);
	}, [isThemeDark]);

	const themeSettings = useMemo(
		() => ({
			toggleTheme,
			colors: theme.colors,
			isThemeDark: isThemeDark,
			setIsLoading,
		}),
		[toggleTheme, theme]
	);

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

	setTimeout(() => {
		setIsLoading(false);
	}, 2100);

	return (
		<ErrorBoundary>
			<ThemeContext.Provider value={themeSettings}>
				<AppProvider id={APP_ID}>
					<StatusBar style={isThemeDark ? 'light' : 'dark'} />

					{isLoading === true && (
						<View
							style={{
								flex: 1,
								backgroundColor: themeSettings.colors.PrimaryBackground,
								justifyContent: 'center',
								alignItems: 'center',
								position: 'absolute',
								top: 0,
								bottom: 0,
								left: 0,
								right: 0,
							}}>
							<ActivityIndicator size="large" color={`${themeSettings.colors.button}`} />
						</View>
					)}

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
};

export default Sentry.Native.wrap(App);
