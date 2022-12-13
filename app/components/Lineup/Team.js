import { useReducer } from 'react';
import { Dimensions, View } from 'react-native';
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

function Team() {
	const SCREEN_WIDTH = Dimensions.get('window').width;
	const SCREEN_HEIGHT = Dimensions.get('window').height;

	const [state, dispatch] = useReducer(reducer, initialState);

	function handleChangePlayer(player) {
		dispatch({
			type: 'changed',
			player: player,
		});
	}

	return (
		<View
			style={{
				position: 'absolute',
				zIndex: 10,
				flexDirection: 'row',
				justifyContent: 'center',
				top: 20,
				width: SCREEN_WIDTH,
				height: SCREEN_HEIGHT - 220,
			}}>
			<Players players={state} onChangePlayer={handleChangePlayer} />
		</View>
	);
}

const initialState = [
	{
		name: 'Mike',
		id: 1,
	},
	{
		name: 'John',
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
