import * as React from 'react';
import { List, Colors } from 'react-native-paper';

const ListItem = ({ name, position }) => (
	<List.Item
		title={name}
		description={position}
		left={props => <List.Icon {...props} style={{ marginRight: -10 }} color={Colors.blue500} icon="account-circle" />}
	/>
);

export default ListItem;
