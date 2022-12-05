import { NavigationContainer } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import Tabs from './app/components/Tabs/Tabs';
import { RealmProvider } from './app/models/Player';
import { TeamContext, UserContext } from './app/context/context';
import { AppProvider, UserProvider } from '@realm/react';
import AccountTabs from './app/components/Tabs/AccountTabs';
import { StatusBar } from 'expo-status-bar';
import SignUp from './app/views/Signup';
import Toast from 'react-native-toast-message';

export default function App() {
	const [team, setTeam] = useState('');
	const [userId, setUserId] = useState('');
	const value = useMemo(() => ({ userId, setUserId }), [userId]);
	return userId === '' ? (
		<UserContext.Provider value={value}>
			<StatusBar style="light" />
			<NavigationContainer>
				<AccountTabs />
			</NavigationContainer>
		</UserContext.Provider>
	) : (
		<AppProvider id={'footieswipe-realm-nhnvh'}>
			<StatusBar style="light" />
			<UserProvider fallback={SignUp}>
				<UserContext.Provider value={value}>
					<TeamContext.Provider value={team}>
						<RealmProvider sync={{ flexible: true }}>
							<NavigationContainer>
								<Tabs />
								<Toast />
							</NavigationContainer>
						</RealmProvider>
					</TeamContext.Provider>
				</UserContext.Provider>
			</UserProvider>
		</AppProvider>
	);
}
