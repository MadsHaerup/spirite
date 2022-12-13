import { createContext } from 'react';

export const UserContext = createContext({
	userId: '',
	setUserId: () => {},
});

export const ThemeContext = createContext({
	colors: {
		primary: '#fff',
		secondary: '#455763',
		PrimaryBackground: '#011E2B',
		secondaryBackground: '#00674A',
		inactive: '#455763',
		iconColor: '#061721',
		icons: '#08D05B',
		edit: '#00674A',
		succes: '#08D05B',
		button: '#08D05B',
		delete: '#FF9999',
		error: '#FF9999',
		outline: '#B2FF00',
		field: '#1C2D38',
	},
});
