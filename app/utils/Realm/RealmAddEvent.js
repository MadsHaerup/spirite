const RealmAddEvent = ({ realm, team, objectId, index } = {}) => {
	realm.write(() => {
		team?.players[index]?.events.push(
			realm.create('Event', {
				_id: objectId,
				date: new Date(),
			})
		);
	});
};

export default RealmAddEvent;
