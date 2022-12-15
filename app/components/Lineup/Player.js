import { useContext } from 'react';
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import { ThemeContext } from '../../context/context';

const Player = ({ player, setActivePlayer, setIsEditing, i }) => {
	const { colors } = useContext(ThemeContext);
	return (
		<View
			style={{
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				width: 100,
				overflow: 'hidden',
			}}>
			<TouchableWithoutFeedback
				onPress={() => {
					setIsEditing(true), setActivePlayer(player);
				}}>
				<View style={{ flexDirection: 'column', alignItems: 'center' }}>
					<Image
						style={{
							flex: 1,
							height: 50,
							width: 50,
							resizeMode: 'contain',
						}}
						source={require('../../../assets/images/player.png')}
					/>
					<Text
						style={{
							color: colors.primary,
							fontSize: 12,
						}}>
						{player.name ? player.name.split(' ').pop() : '+'}
					</Text>
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
};
export default Player;
