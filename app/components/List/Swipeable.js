import React, { useContext } from 'react';
import { Animated } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { ThemeContext } from '../../context/context';
import { useRealm } from '../../context/realmContext';
import { showToast } from '../../utils/Toast/showToast';

const SwipeableItem = ({ children, id, setVisible, setPlayerId }) => {
	const { colors } = useContext(ThemeContext);
	const realm = useRealm();

	const renderLeftActions = dragX => {
		const trans = dragX.interpolate({
			inputRange: [0, 50, 100, 101],
			outputRange: [-20, 0, 0, 1],
			extrapolate: 'clamp',
		});
		return (
			<RectButton
				style={{
					flex: 1,
					justifyContent: 'center',
					paddingLeft: 15,
					backgroundColor: colors.edit,
				}}
				onPress={() => {
					setVisible(true);
					setPlayerId(id);
				}}>
				<Animated.Text
					style={{
						transform: [{ translateX: trans }],
						color: colors.buttonContent,
						padding: 10,
						backgroundColor: 'transparent',
						fontSize: 16,
					}}>
					Edit
				</Animated.Text>
			</RectButton>
		);
	};

	const renderRightActions = dragX => {
		const trans = dragX.interpolate({
			inputRange: [-150, 0],
			outputRange: [1, 0],
			extrapolate: 'clamp',
		});

		return (
			<RectButton
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'flex-end',
					backgroundColor: colors.warning,
				}}
				onPress={() => {
					realm.write(() => {
						try {
							realm.delete(realm.objectForPrimaryKey('Player', id));
							showToast({ type: 'success', title: 'Deletion', body: 'Player has been deleted from list 🗑' });
						} catch (error) {
							console.log(error);
						}
					});
				}}>
				<Animated.Text
					style={{
						transform: [{ translateX: trans }],
						color: colors.buttonContent,
						padding: 10,
						backgroundColor: 'transparent',
						fontSize: 16,
					}}>
					Delete
				</Animated.Text>
			</RectButton>
		);
	};
	return (
		<Swipeable renderLeftActions={renderLeftActions} renderRightActions={renderRightActions}>
			{children}
		</Swipeable>
	);
};

export default SwipeableItem;
