import * as React from 'react';
import { List } from 'react-native-paper';

const ListSection = ({ children }) => (
	<List.Section>
		<List.Subheader>Team Members</List.Subheader>
		{children}
	</List.Section>
);

export default ListSection;
