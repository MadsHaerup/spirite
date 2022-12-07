import React, { useContext } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Home from '../../views/Home';
import Team from '../../views/Team';
import Stats from '../../views/Stats';
import { ThemeContext } from '../../context/context';
import Logout from '../../views/Logout';

const Tabs = () => {
	const Tab = createMaterialBottomTabNavigator();
	const { colors } = useContext(ThemeContext);

	return (
		<Tab.Navigator
			initialRouteName="Home"
			activeColor={`${colors.icons}`}
			inactiveColor={`${colors.inactive}`}
			labelStyle={{ fontSize: 12 }}
			shifting="true"
			barStyle={{
				display: 'flex',
				backgroundColor: colors.PrimaryBackground,
			}}>
			<Tab.Screen
				name="Home"
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
			<Tab.Screen
				name="Logout"
				component={Logout}
				options={{
					tabBarLabel: 'Logout',
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="logout" color={color} size={26} />,
				}}
			/>
		</Tab.Navigator>
	);
};

export default Tabs;
