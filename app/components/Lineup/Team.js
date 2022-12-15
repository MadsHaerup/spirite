import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useReducer, useState } from 'react';
import { Dimensions, View } from 'react-native';
import TeamSheet from '../BottomModal/TeamSheet.js';
import Players from './Players.js';

const reducer = (players, action) => {
	switch (action.type) {
		case 'changed': {
			return players.map(t => {
				if (t.id === action.player.id) {
					return action.player;
				} else {
					return t;
				}
			});
		}
		default: {
			throw Error('Unknown action: ' + action.type);
		}
	}
};
const Team = () => {
	const SCREEN_WIDTH = Dimensions.get('window').width;
	const SCREEN_HEIGHT = Dimensions.get('window').height;

	const formations = [
		{ formation: '4-4-2' },
		{ formation: '4-5-1' },
		{ formation: '4-3-3' },
		{ formation: '3-5-2' },
		{ formation: '3-4-3' },
		{ formation: '5-4-1' },
		{ formation: '5-3-2' },
		{ formation: '5-2-3' },
	];
	const [selectedFormation, setSelectedFormation] = useState(formations[0].formation);

	// const [players, setPlayers] = useState([]);
	const [state, dispatch] = useReducer(reducer, initialState);

	// const fetchData = async () => {
	// 	try {
	// 		const value = await AsyncStorage.getItem('players');
	// 		setPlayers(JSON.parse(value));
	// 	} catch (e) {
	// 		console.log(e);
	// 	}
	// };
	// useEffect(() => {
	// 	console.log(state, 'STATE');
	// 	fetchData();
	// }, [state]);

	const handleChangePlayer = player => {
		dispatch({
			type: 'changed',
			player: player,
		});
		// AsyncStorage.setItem('players', JSON.stringify(state));
	};

	return (
		<View
			style={{
				position: 'absolute',
				flexDirection: 'row',
				justifyContent: 'center',
				top: 20,
				width: SCREEN_WIDTH,
				height: SCREEN_HEIGHT - 220,
			}}>
			<Players players={state} onChangePlayer={handleChangePlayer} selectedFormation={selectedFormation} />
			<TeamSheet
				formations={formations}
				setSelectedFormation={setSelectedFormation}
				selectedFormation={selectedFormation}
			/>
		</View>
	);
};

const initialState = [
	{
		name: '',
		id: 1,
	},
	{
		name: '',
		id: 2,
	},
	{
		name: '',
		id: 3,
	},
	{
		name: '',
		id: 4,
	},
	{
		name: '',
		id: 5,
	},
	{
		name: '',
		id: 6,
	},
	{
		name: '',
		id: 7,
	},
	{
		name: '',
		id: 8,
	},
	{
		name: '',
		id: 9,
	},
	{
		name: '',
		id: 10,
	},
	{
		name: '',
		id: 11,
	},
];

export default Team;
