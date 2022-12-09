const RealmAddPlayer = ({ realm, team, objectId, name, position, age, base64Image } = {}) => {
	realm.write(() => {
		team?.players?.push(
			realm.create('Player', {
				_id: objectId,
				name: name,
				position: position,
				team_name: team.team_name,
				uri: base64Image,
				age: Number(age),
			})
		);
	});
};

export default RealmAddPlayer;
