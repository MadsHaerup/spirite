import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from '../../views/Home';
import Login from '../../views/Login';
import SignUp from '../../views/Signup';

const AccountTabs = () => {
	const Tab = createMaterialBottomTabNavigator();

	return (
		<Tab.Navigator initialRouteName="Login" barStyle={{ display: 'none' }}>
			<Tab.Screen name="SignUp" component={SignUp} />
			<Tab.Screen name="Login" component={Login} />
			<Tab.Screen name="Home" component={Home} />
		</Tab.Navigator>
	);
};

export default AccountTabs;
