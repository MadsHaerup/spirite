import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import Tabs from './app/components/Tabs/Tabs';
import { playerSchema, RealmProvider } from './app/models/Player';
import { Realm } from '@realm/react';
import { UserContext } from './app/context/context';

export default function App() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		(async () => {
			const app = new Realm.App({ id: 'footieswipe-realm-nhnvh' });
			const credentials = Realm.Credentials.anonymous();
			try {
				await app.logIn(credentials);
				setUser(app.currentUser);
				const config = {
					schema: [playerSchema],
					sync: {
						user: app.currentUser,
						flexible: true,
					},
				};

				console.log('config', config);
				console.log(user, 'user');

				const realm = await Realm.open(config);
				console.log(realm.subscriptions.state);

				await realm.subscriptions.update(subs => {
					const players = realm.objects('player');
					subs.add(players);
				});

				// realm.write(() => {
				// 	realm.create('player', {
				// 		_id: new Realm.BSON.ObjectId(),
				// 		name: 'Chuchu',
				// 		position: 'defender',
				// 		uri: '/assets/images/player1.jpg',
				// 	});
				// });
				// const allPlayers = realm.objects('player');
				// console.log(allPlayers, 'allplayers');
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	return user ? (
		<UserContext.Provider value={user}>
			<RealmProvider sync={{ user, flexible: true }}>
				<NavigationContainer>
					<Tabs />
				</NavigationContainer>
			</RealmProvider>
		</UserContext.Provider>
	) : null;
}
