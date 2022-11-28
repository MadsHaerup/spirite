import * as React from 'react';
import { Pressable } from 'react-native';
import { List, Colors } from 'react-native-paper';
import { useRealm } from '../../models/Player';

const ListItem = ({ name, position, id }) => {
	const realm = useRealm();
	console.log(id);
	return (
		<List.Item
			title={name}
			description={position}
			left={props => (
				<List.Icon {...props} style={{ marginRight: -10 }} color={Colors.purple800} icon="account-circle" />
			)}
			right={props => (
				<Pressable
					onPress={() => {
						realm.write(() => {
							try {
								realm.delete(realm.objectForPrimaryKey('Player', id));
							} catch (error) {
								console.log(error);
							}
						});
					}}>
					<List.Icon {...props} color={Colors.purple300} icon="delete" />
				</Pressable>
			)}
		/>
	);
};

export default ListItem;
