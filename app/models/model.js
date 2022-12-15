export const PlayerSchema = {
	name: 'Player',
	properties: {
		_id: 'objectId?',
		age: 'int?',
		name: 'string?',
		position: 'string?',
		team_id: 'objectId?',
		team_name: 'string?',
		events: 'Event[]',
		uri: 'string?',
		// assignee field links the Player back to Team.players.
		assignee: {
			type: 'linkingObjects',
			objectType: 'Teams',
			property: 'players',
		},
	},
	primaryKey: '_id',
};

export const EventSchema = {
	name: 'Event',
	properties: {
		_id: 'objectId?',
		date: 'date?',
		assignee: {
			type: 'linkingObjects',
			objectType: 'Player',
			property: 'events',
		},
	},
	primaryKey: '_id',
};

export const TeamsSchema = {
	name: 'Teams',
	properties: {
		_id: 'objectId?',
		players: 'Player[]',
		team_image_url: 'string?',
		team_name: 'string?',
		user_id: 'string?',
	},
	primaryKey: '_id',
};
