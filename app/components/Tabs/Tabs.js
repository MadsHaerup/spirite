import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Home from '../../views/Home';
import Team from '../../views/Team';
import Stats from '../../views/Stats';

const Tabs = () => {
	const Tab = createMaterialBottomTabNavigator();

	return (
		<Tab.Navigator
			initialRouteName="Home"
			activeColor="#fff"
			labelStyle={{ fontSize: 12 }}
			// barStyle={{ backgroundColor: '#694fad' }}
			barStyle={{
				display: 'flex',
				backgroundColor: '#694fad',
			}}>
			<Tab.Screen
				name="Swipe"
				component={Home}
				options={{
					tabBarLabel: 'Swipe',
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="gesture-swipe" color={color} size={26} />,
				}}
			/>
			<Tab.Screen
				name="Team"
				component={Team}
				options={{
					tabBarLabel: 'Team',
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="human" color={color} size={26} />,
				}}
			/>
			<Tab.Screen
				name="Stats"
				component={Stats}
				options={{
					tabBarLabel: 'Stats',
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="graph" color={color} size={26} />,
				}}
			/>
		</Tab.Navigator>
	);
};

export default Tabs;
