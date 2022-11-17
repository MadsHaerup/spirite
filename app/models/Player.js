import { Realm, createRealmContext } from '@realm/react';

export const playerSchema = {
	name: 'player',
	properties: {
		_id: 'objectId',
		name: 'string',
		position: 'string',
		uri: 'string',
	},
	primaryKey: '_id',
};

export const { useRealm, useQuery, useObject, RealmProvider } = createRealmContext({
	schema: [playerSchema],
	deleteRealmIfMigrationNeeded: true,
});
