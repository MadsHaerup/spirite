import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from '../../views/Home';
import SignUp from '../../views/Signup';
import Login from '../../views/Login';

const AccountTabs = () => {
	const Tab = createMaterialBottomTabNavigator();

	return (
		<Tab.Navigator initialRouteName="sign-up" barStyle={{ display: 'none' }}>
			<Tab.Screen name="SignUp" component={SignUp} />
			<Tab.Screen name="Login" component={Login} />
			<Tab.Screen name="Swipe" component={Home} />
		</Tab.Navigator>
	);
};

export default AccountTabs;
