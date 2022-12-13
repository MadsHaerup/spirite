import React, { useState, useContext } from 'react';
import { Modal, Portal, Button, Provider, TextInput, Text } from 'react-native-paper';
import { Realm } from '@realm/react';
import { useRealm } from '../../models/model';
import { ThemeContext } from '../../context/context';
import { APP_ID } from '@env';
import RealmCreateTeam from '../../utils/Realm/RealmCreateTeam';

const Details = () => {
	const [visible, setVisible] = useState(true);
	const [team, setTeam] = useState('');
	const app = new Realm.App({ id: APP_ID });
	const realm = useRealm();
	const hideModal = () => setVisible(false);
	const { colors } = useContext(ThemeContext);
	const containerStyle = {
		backgroundColor: colors.PrimaryBackground,
		padding: 20,
		borderRadius: 20,
		marginLeft: 10,
		marginRight: 10,
		borderColor: colors.icons,
		borderWidth: 1,
	};
	return (
		<Provider>
			<Portal>
				<Modal visible={visible} contentContainerStyle={containerStyle}>
					<Text style={{ textAlign: 'center', fontSize: 24, fontWeight: '600', padding: 10, color: colors.icons }}>
						Finish Team registration
					</Text>
					<TextInput
						style={{ marginBottom: 20 }}
						mode="outlined"
						activeOutlineColor={`${colors.icons}`}
						label="Team Name"
						value={team}
						onChangeText={team => setTeam(team)}
					/>
					<Button
						style={{ margin: 10, width: 120, alignSelf: 'flex-end', backgroundColor: colors.button }}
						mode="contained"
						onPress={() => {
							try {
								RealmCreateTeam({
									realm: realm,
									objectId: new Realm.BSON.ObjectId(),
									team: team,
									userID: app.currentUser.id,
								});
								setTeam(team);
							} catch (error) {
								console.log(error);
							}
							hideModal();
						}}>
						Submit
					</Button>
				</Modal>
			</Portal>
		</Provider>
	);
};

export default Details;
