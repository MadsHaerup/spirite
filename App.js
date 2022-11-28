import { NavigationContainer } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import Tabs from './app/components/Tabs/Tabs';
import { RealmProvider } from './app/models/Player';
import { TeamContext, UserContext } from './app/context/context';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import { AppProvider, UserProvider } from '@realm/react';
import RegisterPage from './app/views/RegisterPage';
import AccountTabs from './app/components/Tabs/AccountTabs';

export default function App() {
	const [team, setTeam] = useState('');
	const [userId, setUserId] = useState('');
	const value = useMemo(() => ({ userId, setUserId }), [userId]);
	console.log(value);

	return userId === '' ? (
		<UserContext.Provider value={value}>
			<NavigationContainer>
				<AccountTabs />
			</NavigationContainer>
		</UserContext.Provider>
	) : (
		<AppProvider id={'footieswipe-realm-nhnvh'}>
			<UserProvider fallback={RegisterPage}>
				<PaperProvider>
					<UserContext.Provider value={value}>
						<TeamContext.Provider value={team}>
							<RealmProvider sync={{ flexible: true }}>
								<NavigationContainer>
									<Tabs />
								</NavigationContainer>
							</RealmProvider>
						</TeamContext.Provider>
					</UserContext.Provider>
				</PaperProvider>
			</UserProvider>
		</AppProvider>
	);
}
