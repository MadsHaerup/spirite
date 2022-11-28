import React, { createContext } from 'react';

// export const UserContext = createContext();
export const TeamContext = createContext();

export const UserContext = createContext({
	userId: '',
	setUserId: () => {},
});
