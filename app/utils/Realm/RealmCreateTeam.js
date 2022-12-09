const RealmCreateTeam = ({ realm, objectId, team, userID } = {}) => {
	realm.write(() => {
		realm.create('Teams', {
			_id: objectId,
			team_name: team,
			user_id: userID,
		});
	});
};

export default RealmCreateTeam;
