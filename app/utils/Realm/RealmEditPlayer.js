const RealmEditPlayer = ({ realm, player, id, name, age, image } = {}) => {
	realm.write(() => {
		player._id = id;
		player.name = name;
		player.age = Number(age);
		player.uri = image;
	});
};

export default RealmEditPlayer;
