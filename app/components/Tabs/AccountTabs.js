import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from '../../views/Home';
import RegisterPage from '../../views/RegisterPage';
import LoginPage from '../../views/LoginPage';

const AccountTabs = () => {
	const Tab = createMaterialBottomTabNavigator();

	return (
		<Tab.Navigator initialRouteName="register-page" barStyle={{ display: 'none' }}>
			<Tab.Screen name="RegisterPage" component={RegisterPage} />
			<Tab.Screen name="LoginPage" component={LoginPage} />
			<Tab.Screen name="Swipe" component={Home} />
		</Tab.Navigator>
	);
};

export default AccountTabs;
