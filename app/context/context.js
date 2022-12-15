import { createContext } from 'react';

export const UserContext = createContext({
	userId: '',
	setUserId: () => {},
});

export const ThemeContext = createContext({
	isThemeDark: true,
	toggleTheme: () => {},
});
