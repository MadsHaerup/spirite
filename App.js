import { NavigationContainer } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import Tabs from './app/components/Tabs/Tabs';
import { RealmProvider } from './app/models/Player';
import { TeamContext, UserContext } from './app/context/context';
import { AppProvider, UserProvider } from '@realm/react';
import AccountTabs from './app/components/Tabs/AccountTabs';
import { StatusBar } from 'expo-status-bar';
import { RootSiblingParent } from 'react-native-root-siblings';
import SignUp from './app/views/Signup';

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
		<RootSiblingParent>
			<AppProvider id={'footieswipe-realm-nhnvh'}>
				<StatusBar style="light" />
				<UserProvider fallback={SignUp}>
					<UserContext.Provider value={value}>
						<TeamContext.Provider value={team}>
							<RealmProvider sync={{ flexible: true }}>
								<NavigationContainer>
									<Tabs />
								</NavigationContainer>
							</RealmProvider>
						</TeamContext.Provider>
					</UserContext.Provider>
				</UserProvider>
			</AppProvider>
		</RootSiblingParent>
	);
}
