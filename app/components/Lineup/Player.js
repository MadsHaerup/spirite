import { useContext } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { ThemeContext } from '../../context/context';

const Player = ({ player, setActivePlayer, setIsEditing }) => {
	const { colors } = useContext(ThemeContext);
	let playerContent;
	playerContent = (
		<View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
			<Button
				color={`${'white'}`}
				style={{ backgroundColor: colors.icons, color: colors.primary, borderRadius: 20 }}
				mode="outlined"
				onPress={() => {
					setIsEditing(true), setActivePlayer(player);
				}}>
				{player.name ? player.name : '+'}
			</Button>
		</View>
	);
	return <Text>{playerContent}</Text>;
};

export default Player;
