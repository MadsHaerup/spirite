import { createRealmContext } from '@realm/react';

export const PlayerSchema = {
	name: 'Player',
	properties: {
		_id: 'objectId?',
		name: 'string?',
		position: 'string?',
		team_id: 'objectId?',
		team_name: 'string?',
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

export const { useRealm, useQuery, useObject, RealmProvider } = createRealmContext({
	schema: [TeamsSchema, PlayerSchema],
	deleteRealmIfMigrationNeeded: true,
});
