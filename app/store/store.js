import create from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export const useAttendanceStore = create(set => ({
	attendance: 0,
	absence: 0,
	increaseAttendance: () => set(state => ({ attendance: state.attendance + 1 })),
	increaseAbsence: () => set(state => ({ absence: state.absence + 1 })),
}));

export const useStore = create(set => ({
	// initial state
	players: [
		{
			id: '1',
			name: 'Mike',
			position: 'Goalkeeper',
			uri: require('../../assets/images/player1.jpg'),
		},
		{
			id: '2',
			name: 'Andy',
			position: 'Defender',
			uri: require('../../assets/images/player2.jpg'),
		},
		{
			id: '3',
			name: 'Craig',
			position: 'Defender',
			uri: require('../../assets/images/player3.jpg'),
		},
		{
			id: '4',
			name: 'John',
			position: 'Midfielder',
			uri: require('../../assets/images/player4.jpg'),
		},
		{
			id: '5',
			name: 'Neil',
			position: 'Midfielder',
			uri: require('../../assets/images/player5.jpg'),
		},
		{
			id: '6',
			name: 'Joe',
			position: 'Striker',
			uri: require('../../assets/images/player6.jpg'),
		},
	],
	// methods for manipulating state
	addPlayer: (name, position) => {
		set(state => ({
			players: [
				...state.players,
				{
					id: uuidv4(),
					name,
					position,
				},
			],
		}));
	},
	removeplayer: id => {
		set(state => ({
			players: state.players.filter(player => player.id !== id),
		}));
	},
}));
