import { createRealmContext } from '@realm/react';
import { EventSchema, PlayerSchema, TeamsSchema } from '../models/model';

export const { useRealm, useQuery, useObject, RealmProvider } = createRealmContext({
	schema: [TeamsSchema, PlayerSchema, EventSchema],
	deleteRealmIfMigrationNeeded: true,
});
