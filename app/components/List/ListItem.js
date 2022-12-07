import React, { useContext, memo } from 'react';
import { List } from 'react-native-paper';
import { ThemeContext } from '../../context/context';
import SwipeableItem from './Swipeable';

const ListItem = ({ name, position, id, age, src, setVisible, setPlayerId }) => {
	const { colors } = useContext(ThemeContext);
	return (
		<SwipeableItem id={id} setVisible={setVisible} setPlayerId={setPlayerId}>
			<List.Item
				style={{ backgroundColor: colors.field, borderBottomColor: colors.icons, borderBottomWidth: 1 }}
				descriptionStyle={{ color: colors.primary }}
				title={name + ',' + ' ' + age}
				titleStyle={{ color: colors.primary }}
				description={position}
				left={props => <List.Icon {...props} style={{ marginRight: -10 }} color={colors.icons} icon="account-circle" />}
			/>
		</SwipeableItem>
	);
};

export default memo(ListItem);
