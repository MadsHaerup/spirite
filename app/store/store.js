import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export const useAttendanceStore = create(set => ({
	attendance: 0,
	absence: 0,
	increaseAttendance: () => set(state => ({ attendance: state.attendance + 1 })),
	increaseAbsence: () => set(state => ({ absence: state.absence + 1 })),
}));

export const useStore = create(set => ({
	// initial state
	players: [],
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
