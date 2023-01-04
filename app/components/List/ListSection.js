import React, { useContext } from 'react';
import { List } from 'react-native-paper';
import { ThemeContext } from '../../context/context';

const ListSection = ({ children }) => {
	const { colors } = useContext(ThemeContext);

	return (
		<List.Section>
			<List.Subheader style={{ color: colors?.primary }}>Team Members</List.Subheader>
			{children}
		</List.Section>
	);
};

export default ListSection;
